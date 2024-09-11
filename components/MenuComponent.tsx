"use client";

import React, { useState, useEffect } from 'react';
import styles from '../styles/MenuComponent.module.css'; // Mantiene los estilos del menú
import LoginModal from './LoginModal'; // Importa el modal de inicio de sesión
import SignUpModal from './SignUpModal'; // Importa el modal de registro
import { auth } from '../firebaseConfig'; // Importa Firebase auth
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // Estado para guardar los datos del usuario autenticado

  useEffect(() => {
    // Observa el estado de autenticación del usuario
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Aquí puedes obtener más datos del Firestore si es necesario
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Limpia el observador al desmontar el componente
  }, []);

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

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null); // Limpia el estado del usuario al cerrar sesión
  };

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
          {user ? (
            // Si el usuario está autenticado, muestra su avatar y nombre
            <div className={styles.userMenu}>
              <button className={styles.userButton}>
                <img src={user.photoURL || '/default-avatar.png'} alt="Avatar" className={styles.avatar} />
                {user.displayName || 'Usuario'}
              </button>
              <div className={styles.dropdownMenu}>
                <ul>
                  <li>
                    <a href="/profile">Mi Perfil</a>
                  </li>
                  <li>
                    <a href="/settings">Configuración</a>
                  </li>
                  <li onClick={handleLogout}>
                    <a href="#">Cerrar Sesión</a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            // Si no está autenticado, muestra los botones de login y registro
            <>
              <button className={styles.loginButton} onClick={openLoginModal}>
                Iniciar Sesión
              </button>
              <button className={styles.signupButton} onClick={openSignUpModal}>
                Únete
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Renderiza los modales de inicio de sesión y registro */}
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
    </>
  );
};

export default Navbar;
