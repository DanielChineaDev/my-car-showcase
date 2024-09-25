"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faWarehouse, faFolderClosed, faCar, faGear, faGrip, faArrowLeft, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from 'firebase/auth';
import styles from '../../styles/navigation/SideMenuComponent.module.css';
import Image from 'next/image';

const Sidebar = ({ user, selectedSection, onSectionChange }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleGoBack = () => {
      router.push('/');
  };
  

  return (
    <div className={styles.sidebar}>
      {/* Botón de volver */}
      <button className={styles.backButton} onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Volver</span>
      </button>

      {/* Verificar si los datos del usuario están disponibles */}
      {user ? (
        <div className={styles.userCard}>
          <div className={styles.avatarContainer}>
            <Image
              src={user.avatarUrl}
              alt={`${user.firstName} ${user.lastName}`}
              layout="fill"
              objectFit="cover"
              className={styles.userAvatar}
            />
          </div>
          <div>
            <p className={styles.userName}>{user.firstName} {user.lastName}</p>
            <p className={styles.userRole}>
              {user.role === 'admin' ? 'Administrador' : 'Miembro'}
            </p>
          </div>
        </div>
      ) : (
        <p>Cargando usuario...</p>
      )}

      {/* Sección Cuenta */}
      <h3 className={styles.sectionTitle}>Cuenta</h3>
      <ul className={styles.menu}>
        <li
          className={`${styles.menuItem} ${selectedSection === 'general' ? styles.active : ''}`}
          onClick={() => onSectionChange('general')}
        >
          <FontAwesomeIcon icon={faHome} className={styles.icon} />
          <span className={styles.text}>Mi perfil</span>
        </li>
        <li
          className={`${styles.menuItem} ${selectedSection === 'garage' ? styles.active : ''}`}
          onClick={() => onSectionChange('garage')}
        >
          <FontAwesomeIcon icon={faWarehouse} className={styles.icon} />
          <span className={styles.text}>Garaje</span>
        </li>
        <li
          className={`${styles.menuItem} ${selectedSection === 'profiles' ? styles.active : ''}`}
          onClick={() => onSectionChange('profiles')}
        >
          <FontAwesomeIcon icon={faCar} className={styles.icon} />
          <span className={styles.text}>Corredores</span>
        </li>
        <li
          className={`${styles.menuItem} ${selectedSection === 'rules' ? styles.active : ''}`}
          onClick={() => onSectionChange('rules')}
        >
          <FontAwesomeIcon icon={faCircleInfo} className={styles.icon} />
          <span className={styles.text}>Estatutos y normas</span>
        </li>
        <li
          className={`${styles.menuItem} ${selectedSection === 'settings' ? styles.active : ''}`}
          onClick={() => onSectionChange('settings')}
        >
          <FontAwesomeIcon icon={faGear} className={styles.icon} />
          <span className={styles.text}>Configuración</span>
        </li>
      </ul>

      <hr className={styles.hrDivider} />

      {/* Sección Admin */}
      <h3 className={styles.sectionTitle}>Admin</h3>
      <ul className={styles.menu}>
        <li
          className={`${styles.menuItem} ${selectedSection === 'adminPanel' ? styles.active : ''}`}
          onClick={() => onSectionChange('adminPanel')}
        >
          <FontAwesomeIcon icon={faGrip} className={styles.icon} />
          <span className={styles.text}>Panel de administrador</span>
        </li>
        <li
          className={`${styles.menuItem} ${selectedSection === 'requests' ? styles.active : ''}`}
          onClick={() => onSectionChange('requests')}
        >
          <FontAwesomeIcon icon={faFolderClosed} className={styles.icon} />
          <span className={styles.text}>Solicitudes</span>
        </li>
      </ul>

      <button onClick={handleLogout} className={styles.logoutButton}>
        <span>Cerrar sesión</span>
      </button>
    </div>
  );
};

export default Sidebar;
