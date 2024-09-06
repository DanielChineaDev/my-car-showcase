// MenuComponent.tsx

"use client";

import React, { useState } from 'react';
import styles from '../styles/MenuComponent.module.css'; // Mantiene los estilos del menú
import LoginModal from './LoginModal'; // Importa el modal de inicio de sesión

const Navbar: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <>
      <nav className={styles.navbar}>
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
          <button className={styles.loginButton} onClick={openLoginModal}>
            Iniciar Sesión
          </button>
          <button className={styles.signupButton}>
            Únete
          </button>
        </div>
      </nav>

      {/* Renderiza el modal cuando se haga clic en "Iniciar Sesión" */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Navbar;
