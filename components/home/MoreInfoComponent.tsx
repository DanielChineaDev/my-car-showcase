"use client"; // Asegura que el archivo se ejecute en el cliente

import React, { useState } from 'react';
import styles from '../../styles/home/MoreInfo.module.css';
import LoginModal from '../auth/LoginModal';
import SignUpModal from '../auth/SignUpModal';

const Section3: React.FC = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  return (
    <section className={styles.section3}>
      <h2>Empresas Colaboradoras</h2>

      {/* Carrusel de tarjetas */}
      <div className={styles.carousel}>
        {/* Aquí implementarías tu carrusel de logos */}
      </div>

      {/* Botón para unirse */}
      <button className={styles.joinButton} onClick={openSignUpModal}>Únete al Club</button>

      {/* Indicador de apps futuras */}
      <p>Próximamente disponible en iOS y Android</p>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSwitchToSignUp={openSignUpModal}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={closeSignUpModal}
        onSwitchToLogin={openLoginModal}
      />
    </section>
  );
};

export default Section3;
