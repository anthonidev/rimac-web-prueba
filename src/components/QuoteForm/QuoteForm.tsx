'use client';

import styles from './QuoteForm.module.scss';
import {
  useQuoteForm,
  type QuoteFormValues,
} from './useQuoteForm';

export default function QuoteForm() {
  const {
    register,
    handleSubmit,
    errors,
    currentDocumentType,
    documentTypeField,
    handleDocumentTypeChange,
  } = useQuoteForm();

  const onSubmit = (data: QuoteFormValues) => {
    console.log(data);
  };

  const documentClassName = [
    styles.form__document,
    errors.documentNumber ? styles['form__document--error'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const phoneFieldClassName = [
    styles.form__field,
    errors.phone ? styles['form__field--error'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const privacyCheckboxClassName = [
    styles.form__checkbox,
    errors.acceptPrivacy ? styles['form__checkbox--error'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  const communicationsCheckboxClassName = [
    styles.form__checkbox,
    errors.acceptCommunications ? styles['form__checkbox--error'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Document row - Select and Input together */}
      <div className={styles.form__control}>
        <div className={documentClassName}>
          <select
            {...documentTypeField}
            onChange={handleDocumentTypeChange}
            className={styles.form__document__select}
            aria-invalid={errors.documentType ? 'true' : 'false'}
          >
            <option value="DNI">DNI</option>
            <option value="RUC">RUC</option>
          </select>
          <div className={styles.form__document__input}>
            <label htmlFor="documentNumber" className={styles.form__document__label}>
              Nro. de documento
            </label>
            <input
              type="text"
              id="documentNumber"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={currentDocumentType === 'DNI' ? 8 : 11}
              placeholder={
                currentDocumentType === 'DNI' ? '30216147' : '20123456789'
              }
              className={styles.form__document__field}
              aria-invalid={errors.documentNumber ? 'true' : 'false'}
              {...register('documentNumber', {
                setValueAs: (value) => (value ? value.replace(/\D/g, '') : ''),
              })}
            />
          </div>
        </div>
        {errors.documentNumber && (
          <span className={styles.form__error}>{errors.documentNumber.message}</span>
        )}
      </div>

      {/* Phone field */}
      <div className={styles.form__control}>
        <div className={phoneFieldClassName}>
          <label htmlFor="phone" className={styles.form__label}>
            Celular
          </label>
          <input
            type="tel"
            id="phone"
            inputMode="numeric"
            pattern="[0-9]*"
            className={styles.form__input}
            placeholder="5130216147"
            aria-invalid={errors.phone ? 'true' : 'false'}
            {...register('phone', {
              setValueAs: (value) => (value ? value.replace(/\D/g, '') : ''),
            })}
          />
        </div>
        {errors.phone && (
          <span className={styles.form__error}>{errors.phone.message}</span>
        )}
      </div>

      {/* Checkboxes */}
      <div className={styles.form__control}>
        <label className={privacyCheckboxClassName} htmlFor="privacy">
          <input
            type="checkbox"
            id="privacy"
            className={styles.form__checkbox__input}
            aria-invalid={errors.acceptPrivacy ? 'true' : 'false'}
            {...register('acceptPrivacy')}
          />
          <span className={styles.form__checkbox__text}>
            Acepto la Política de Privacidad
          </span>
        </label>
        {errors.acceptPrivacy && (
          <span className={styles.form__error}>{errors.acceptPrivacy.message}</span>
        )}
      </div>

      <div className={styles.form__control}>
        <label className={communicationsCheckboxClassName} htmlFor="communications">
          <input
            type="checkbox"
            id="communications"
            className={styles.form__checkbox__input}
            aria-invalid={errors.acceptCommunications ? 'true' : 'false'}
            {...register('acceptCommunications')}
          />
          <span className={styles.form__checkbox__text}>
            Acepto la Política de Comunicaciones Comerciales
          </span>
        </label>
        {errors.acceptCommunications && (
          <span className={styles.form__error}>{errors.acceptCommunications.message}</span>
        )}
      </div>

      {/* Terms link */}
      <a href="#" className={styles.form__terms}>
        Aplican Términos y Condiciones.
      </a>

      {/* Submit button */}
      <button type="submit" className={styles.form__submit}>
        Cotiza aquí
      </button>
    </form>
  );
}
