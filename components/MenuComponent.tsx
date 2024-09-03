"use client";

import React, { useState, useEffect } from 'react';
import styles from '../styles/MenuComponent.module.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.leftContainer}>
        <div className={styles.logo} onClick={() => window.scrollTo(0, 0)}>
          <img src="/revenge_logo_menu.svg" alt="Revenge Logo" />
        </div>
        <ul className={styles.navLinks}>
          <li>
            <a href="#about" className={styles.link}>Sobre Nosotros</a>
          </li>
        </ul>
      </div>
      <div className={styles.authButtons}>
        <button className={styles.loginButton} onClick={() => setIsLoginModalOpen(true)}>
          Iniciar Sesión
        </button>
        <button className={styles.signupButton} onClick={() => setIsSignupModalOpen(true)}>
          Únete
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
