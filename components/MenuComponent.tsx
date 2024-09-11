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
                <img src={userData?.avatarUrl || '/default-avatar.png'} alt="Avatar" className={styles.avatar} />
                {userData?.firstName || 'Usuario'}
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
