"use client"; // Asegura que el archivo se ejecute en el cliente

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/navigation/MenuComponent.module.css';
import LoginModal from '../auth/LoginModal';
import SignUpModal from '../auth/SignUpModal';
import { auth, db } from '../../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Navbar: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [notificationsCount, setNotificationsCount] = useState(0); // Estado para el número de notificaciones
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
          setNotificationsCount(userDocSnap.data().notifications || 0); // Asigna el número de notificaciones desde Firestore
        } else {
          console.log('No se encontraron datos adicionales del usuario en Firestore');
        }

        setUser(currentUser);
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
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
    setUser(null);
    setUserData(null);
    setNotificationsCount(0); // Limpia las notificaciones al cerrar sesión
  };

  const goToProfile = () => {
    if (user && user.uid) {
      router.push(`/profile/${user.uid}`);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
          <div className={styles.leftContainer}>
            <div className={styles.logo} onClick={() => window.scrollTo(0, 0)}>
              <img src="/revenge_logo.svg" alt="Revenge Logo" />
            </div>
          </div>

          <ul className={styles.navLinks}>
            <li>
              <a href="#about" className={styles.link}>Sobre Nosotros</a>
            </li>
            <li>
              <a href="#about" className={styles.link}>Colaboradores</a>
            </li>
          </ul>

          <div className={styles.authButtons}>
            {user ? (
              <div className={styles.userMenu}>
                <button className={styles.userButton}>
                  <div className={styles.avatarWrapper}>
                    <img src={userData?.avatarUrl || '/default-avatar.png'} alt="Avatar" className={styles.avatar} />
                    {notificationsCount > 0 && (
                      <span className={styles.badge}>{notificationsCount}</span> // Badge de notificaciones
                    )}
                  </div>
                  <span className={styles.userName}>{userData?.firstName || 'Usuario'}</span>
                  <span className={styles.arrowDown}>▼</span>
                </button>
                <div className={styles.dropdownMenu}>
                  <ul>
                    <li onClick={goToProfile}>
                      <a href="#">Mi Perfil</a>
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
        </div>
      </nav>

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
