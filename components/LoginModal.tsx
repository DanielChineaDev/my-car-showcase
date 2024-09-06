// LoginModal.tsx

"use client";

import React, { useState } from 'react';
import styles from '../styles/LoginModal.module.css';

const LoginModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no se renderiza nada.

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalLeft}>
          <h2>¡Hola!</h2>
          <p>Bienvenido a Revenge. Inicia sesión para continuar.</p>
          <button className={styles.googleButton}>Iniciar sesión con Google</button>
          <div className={styles.separator}>o</div>
          <form className={styles.loginForm}>
            <input type="email" placeholder="Tu correo electrónico" className={styles.input} />
            <input type="password" placeholder="Contraseña" className={styles.input} />
            <button className={styles.modalButton}>Iniciar Sesión</button>
          </form>
          <a href="#" className={styles.forgotPassword}>¿Olvidaste tu contraseña?</a>
        </div>
        <div className={styles.modalRight}>
          <h3>La comunidad más grande de coches</h3>
          <p>Únete y forma parte de algo grande.</p>
        </div>
        <button className={styles.closeModal} onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default LoginModal;
