import Image from 'next/image';
import styles from './Footer.module.scss';

const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__logo}>
          <Image
            src="/icons/logo.svg"
            alt="Rimac Logo"
            width={85.39}
            height={42}
            className={styles['footer__logo-image']}
          />
        </div>

        <hr className={styles.footer__divider} />

        <div className={styles.footer__copyright}>
          <span>© {getCurrentYear()} RIMAC Seguros y Reaseguros.</span>
        </div>
      </div>
    </footer>
  );
}
