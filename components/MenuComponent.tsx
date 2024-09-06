"use client";

import React, { useState } from 'react';
import styles from '../styles/MenuComponent.module.css'; // Mantiene los estilos del menú
import LoginModal from './LoginModal'; // Importa el modal de inicio de sesión
import SignUpModal from './SignUpModal'; // Importa el modal de registro

const Navbar: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false); // Asegúrate de que se cierra el modal de registro
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false); // Asegúrate de que se cierra el modal de inicio de sesión
  };

  const closeSignUpModal = () => setIsSignUpModalOpen(false);

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
          <button className={styles.signupButton} onClick={openSignUpModal}>
            Únete
          </button>
        </div>
      </nav>

      {/* Renderiza el modal cuando se haga clic en "Iniciar Sesión" */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={closeSignUpModal}
        onSwitchToLogin={openLoginModal} // Pasamos la función para cambiar al modal de login
      />
    </>
  );
};

export default Navbar;