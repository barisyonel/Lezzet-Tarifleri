import Link from 'next/link';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {/* Sol Bölüm - Telif Hakkı */}
        <div className={styles.left}>
          <p>© 2025 Lezzet Tarifleri. Tüm hakları saklıdır.</p>
        </div>

        {/* Orta Bölüm - Menü Linkleri */}
        <div className={styles.center}>
          <ul>
            <li><Link href="/">Ana Sayfa</Link></li>
            <li><Link href="/category">Kategoriler</Link></li>
            <li><Link href="/favorites">Favorilerim</Link></li>
            <li><Link href="/about">Hakkımızda</Link></li>
          </ul>
        </div>

        {/* Sağ Bölüm - Sosyal Medya */}
        <div className={styles.right}>
          <p>Bizi Takip Edin:</p>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
