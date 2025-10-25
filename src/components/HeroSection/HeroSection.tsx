import Image from 'next/image';
import QuoteForm from '../QuoteForm/QuoteForm';
import styles from './HeroSection.module.scss';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        {/* Left content - Image and mobile text */}
        <div className={styles.hero__content}>
          <div className={styles.hero__text}>
            <span className={styles.hero__badge}>Seguro Salud Flexible</span>
            <h1 className={styles.hero__title}>Creado para ti y tu familia</h1>
          </div>
          <div className={styles.hero__image}>
            <Image
              src="/imgs/hero_image.png"
              alt="Familia feliz"
              width={480}
              height={560}
              className={styles['hero__image--desktop']}
              priority
            />
            <Image
              src="/imgs/hero_image_mobile.png"
              alt="Familia feliz"
              width={136}
              height={160}
              className={styles['hero__image--mobile']}
              priority
            />
          </div>
        </div>

        {/* Right content - Form section */}
        <div className={styles.hero__form}>
          <p className={styles['hero__subtitle--mobile']}>
            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
          </p>

          <div className={styles.hero__header}>
            <span className={styles.hero__badge}>Seguro Salud Flexible</span>
            <h1 className={styles.hero__title}>Creado para ti y tu familia</h1>
            <p className={styles.hero__subtitle}>
              Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
            </p>
          </div>

          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
