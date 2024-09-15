import React from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faWarehouse, faFolderClosed, faCircleXmark, faGear, faGrip } from "@fortawesome/free-solid-svg-icons";
import styles from '../styles/SideMenuComponent.module.css';
import Image from 'next/image';

const Sidebar = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Cerrar sesión en Firebase
      router.push('/'); // Redireccionar a la página de inicio
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className={styles.sidebar}>
      {/* Verificar si los datos del usuario están disponibles */}
      {user ? (
        <div className={styles.userCard}>
  <div className={styles.avatarContainer}>
    <Image
      src={user.avatarUrl}
      alt={`${user.firstName} ${user.lastName}`}
      layout="fill" // Esto permite que la imagen ocupe todo el contenedor
      objectFit="cover" // Esto asegura que la imagen mantenga la proporción y llene el área del contenedor
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
        <li className={styles.menuItem}>
          <FontAwesomeIcon icon={faHome} className={styles.icon} />
          <span className={styles.text}>General</span>
        </li>
        <li className={styles.menuItem}>
          <FontAwesomeIcon icon={faWarehouse} className={styles.icon} />
          <span className={styles.text}>Garaje</span>
          <span className={styles.badge}>4</span>
        </li>
        <li className={styles.menuItem}>
          <FontAwesomeIcon icon={faGear} className={styles.icon} />
          <span className={styles.text}>Configuración</span>
        </li>
      </ul>

      <hr className={styles.hrDivider} />

      {/* Sección Admin */}
      <h3 className={styles.sectionTitle}>Admin</h3>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <FontAwesomeIcon icon={faGrip} className={styles.icon} />
          <span className={styles.text}>Panel de administrador</span>
        </li>
        <li className={styles.menuItem}>
          <FontAwesomeIcon icon={faFolderClosed} className={styles.icon} />
          <span className={styles.text}>Solicitudes</span>
        </li>
      </ul>

      {/* Botón de cerrar sesión */}
      <button onClick={handleLogout} className={styles.logoutButton}>
        <span>Cerrar sesión</span>
      </button>
    </div>
  );
};

export default Sidebar;
