import Image from 'next/image';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__logo}>
          <Image
            src="/icons/logo.svg"
            alt="Rimac Logo"
            width={73.19}
            height={36}
            priority
            className={styles['navbar__logo-image']}
          />
        </div>

        <div className={styles.navbar__contact}>
          <span className={styles.navbar__text}>¡Compra por este medio!</span>
          <div className={styles.navbar__phone__container}>
            <Image
              src="/icons/cell.svg"
              alt="Phone"
              width={20}
              height={20}
              className={styles.navbar__icon}
            />
            <span className={styles.navbar__phone}>(01) 411 6001</span>
          </div>

        </div>
      </div>
    </nav>
  );
}
