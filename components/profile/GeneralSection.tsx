import React from 'react';
import Image from 'next/image'; // Importamos el componente de Next.js para optimizar las imágenes
import styles from '../../styles/profile/GenerallSection.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

interface GeneralSectionProps {
  user: {
    firstName: string;
    lastName: string;
    role: string;
    bio: string;
    avatarUrl: string;
    headerImageUrl: string;
    social: {
      instagram: string;
      twitter: string;
    };
  };
}

const GeneralSection: React.FC<GeneralSectionProps> = ({ user }) => {
  // Mapeo de roles desde Firebase a roles que se mostrarán en la interfaz
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'founder':
        return 'Fundador';
      default:
        return 'Miembro';
    }
  };

  return (
    <div className={styles.profileCard}>
      {/* Header background with a Firebase image URL */}
      <div className={styles.headerBackground}>
        <Image
          className={styles.headerImage}
          src={user.avatarUrl} // URL de la imagen obtenida desde Firebase
          alt="Header Background"
          layout="fill" // Importante para optimizar con Next.js
          objectFit="cover"
          priority // Para cargar esta imagen lo más rápido posible
        />
        <Image
          className={styles.profilePicture}
          src={user.avatarUrl} // URL de la imagen de perfil obtenida desde Firebase
          alt={`${user.firstName} ${user.lastName}`}
          width={96} // Tamaño en píxeles para la optimización
          height={96}
          priority // Para cargar esta imagen de forma rápida
        />
      </div>

      {/* Profile Info */}
      <div className={styles.content}>
        <div className={styles.profileInfo}>
          <div>
            <h2 className={styles.name}>
              {user.firstName} {user.lastName}
            </h2>
            <span className={styles.jobTitle}>{getRoleLabel(user.role)}</span>
          </div>
          <button className={styles.editButton}>Editar Perfil</button>
        </div>

        {/* Bio del usuario */}
        <p className={styles.bio}>{user.bio}</p>

        {/* Redes Sociales */}
        <div className={styles.badges}>
          <div className={`${styles.badge} ${styles.pill}`}>
            <a href={user.social.instagram} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faHashtag} className={styles.icon} />
              <span>Instagram</span>
            </a>
          </div>
          <div className={`${styles.badge} ${styles.pill}`}>
            <a href={user.social.twitter} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faHashtag} className={styles.icon} />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
