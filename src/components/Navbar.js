import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.scss';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Menü dışında tıklanınca menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className={styles.navbar} ref={menuRef}>
      <div className={styles.logo}>
        <Link href="/">🍽️ Lezzet Tarifleri</Link>
      </div>
      <div className={styles.menuButton} onClick={toggleMenu}>
        {menuOpen ? "✖" : "☰"}
      </div>
      <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
        <li><Link href="/" onClick={() => setMenuOpen(false)}>Ana Sayfa</Link></li>
        <li><Link href="/category" onClick={() => setMenuOpen(false)}>Kategoriler</Link></li>
        <li><Link href="/favorites" onClick={() => setMenuOpen(false)}>Favorilerim</Link></li>
        <li><Link href="/about" onClick={() => setMenuOpen(false)}>Hakkımızda</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
