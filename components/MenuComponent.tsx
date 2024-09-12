"use client";

import React, { useState, useEffect } from 'react';
import styles from '../styles/MenuComponent.module.css'; // Mantiene los estilos del menú
import LoginModal from './LoginModal'; // Importa el modal de inicio de sesión
import SignUpModal from './SignUpModal'; // Importa el modal de registro
import { auth, db } from '../firebaseConfig'; // Importa Firebase auth y Firestore
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Para obtener los datos de Firestore

const Navbar: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // Estado para guardar los datos del usuario autenticado
  const [userData, setUserData] = useState<any>(null); // Estado para los datos adicionales del usuario

  useEffect(() => {
    // Observa el estado de autenticación del usuario
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Obtenemos los datos adicionales desde Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserData(userData); // Guardamos los datos adicionales
        } else {
          console.log('No se encontraron datos adicionales del usuario en Firestore');
        }

        setUser(currentUser); // Guardamos el usuario autenticado
      } else {
        setUser(null);
        setUserData(null);
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
    setUserData(null); // Limpia los datos adicionales del usuario
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.leftContainer}>
          <div className={styles.logo} onClick={() => window.scrollTo(0, 0)}>
            <img src="/revenge_logo.svg" alt="Revenge Logo" />
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
                <img src={userData?.avatarUrl || '/default-avatar.png'} alt="Avatar" className={styles.avatar} />
                <span className={styles.userName}>{userData?.firstName || 'Usuario'}</span>
                <span className={styles.arrowDown}>▼</span> {/* Flecha hacia abajo */}
              </button>
              <div className={styles.dropdownMenu}>
                <ul>
                  <li>
                    <a href="/profile">
                      <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      Mi Perfil
                    </a>
                  </li>
                  <li>
                    <a href="/settings">
                      <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.39.12-.6l-1.92-3.32c-.1-.17-.31-.25-.5-.21l-2.39.96c-.5-.38-1.02-.7-1.61-.94l-.36-2.56C14.38 2.22 14.2 2 14 2h-4c-.2 0-.38.22-.43.42l-.36 2.56c-.59.24-1.12.56-1.61.94l-2.39-.96c-.19-.04-.4.04-.5.21l-1.92 3.32c-.11.19-.07.45.12.6l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.39-.12.6l1.92 3.32c.1.17.31.25.5.21l2.39-.96c.5.38 1.02.7 1.61.94l.36 2.56c.05.2.23.42.43.42h4c.2 0 .38-.22.43-.42l.36-2.56c.59-.24 1.12-.56 1.61-.94l2.39.96c.19.04.4-.04.5-.21l1.92-3.32c.11-.19.07-.45-.12-.6l-2.03-1.58zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                      </svg>
                      Configuración
                    </a>
                  </li>
                  <li onClick={handleLogout}>
                    <a href="#">
                      <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 13.41L15.17 13H8v-2h7.17l1.41-1.41L18 11l-2 2 2 2-1.41 1.41z"/>
                      </svg>
                      Cerrar Sesión
                    </a>
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
