'use client';

import { useQuoteApi } from '@/features/home/hooks/useQuoteApi';
import { Button } from '@/shared/components/Button/Button';
import { Checkbox } from '@/shared/components/Checkbox/Checkbox';
import { DocumentInput } from '@/shared/components/DocumentInput/DocumentInput';
import { Input } from '@/shared/components/Input/Input';
import styles from './QuoteForm.module.scss';
import { useQuoteForm, type QuoteFormValues } from './useQuoteForm';

export default function QuoteForm() {
  const {
    register,
    handleSubmit,
    errors,
    currentDocumentType,
    documentTypeField,
    handleDocumentTypeChange,
  } = useQuoteForm();

  const { submitQuote, isLoading, error: apiError } = useQuoteApi();

  const onSubmit = async (data: QuoteFormValues) => {
    await submitQuote({
      documentNumber: data.documentNumber,
      phone: data.phone,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <DocumentInput
        id="documentNumber"
        label="Nro. de documento"
        documentType={currentDocumentType}
        documentTypeRegister={documentTypeField}
        onDocumentTypeChange={handleDocumentTypeChange}
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={currentDocumentType === 'DNI' ? 8 : 11}
        placeholder={currentDocumentType === 'DNI' ? '30216147' : '20123456789'}
        error={errors.documentNumber?.message}
        {...register('documentNumber', {
          setValueAs: (value) => (value ? value.replace(/\D/g, '') : ''),
        })}
      />

      <Input
        type="tel"
        id="phone"
        label="Celular"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="5130216147"
        error={errors.phone?.message}
        {...register('phone', {
          setValueAs: (value) => (value ? value.replace(/\D/g, '') : ''),
        })}
      />

      <Checkbox
        id="privacy"
        label="Acepto la Política de Privacidad"
        error={errors.acceptPrivacy?.message}
        {...register('acceptPrivacy')}
      />

      <Checkbox
        id="communications"
        label="Acepto la Política de Comunicaciones Comerciales"
        error={errors.acceptCommunications?.message}
        {...register('acceptCommunications')}
      />

      <a href="#" className={styles.form__terms}>
        Aplican Términos y Condiciones.
      </a>

      <Button type="submit" isLoading={isLoading}>
        Cotiza aquí
      </Button>

      {apiError && <span className={styles.form__error}>{apiError}</span>}
    </form>
  );
}
