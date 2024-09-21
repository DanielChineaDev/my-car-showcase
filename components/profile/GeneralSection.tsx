import React from 'react';
import Image from 'next/image'; // Para optimizar las imágenes con Next.js
import styles from '../../styles/profile/GenerallSection.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

interface Car {
  brand: string;
  model: string;
  year: string;
  imageUrl: string;
  isMainCar: boolean;
}

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
    cars: Car[]; // Añadimos los coches del usuario
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
    <div className={styles.pageContainer}>
      {/* Tarjeta del perfil */}
      <div className={styles.profileCard}>
        {/* Header background with a Firebase image URL */}
        <div className={styles.headerBackground}>
          <Image
            className={styles.headerImage}
            src={user.headerImageUrl} // URL de la imagen obtenida desde Firebase
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

      {/* Tarjeta del garaje */}
      <div className={styles.garageCard}>
        <h2 className={styles.sectionTitle}>Mi Garaje</h2>
        <div className={styles.carList}>
          {user.cars.length > 0 ? (
            user.cars.map((car, index) => (
              <div key={index} className={styles.carCard}>
                {/* Columna de la imagen del coche */}
                <div className={styles.carImageContainer}>
                  <Image
                    src={car.imageUrl || '/default-car.jpg'} // Carga una imagen predeterminada si no hay URL
                    alt={`${car.brand} ${car.model}`}
                    width={150}
                    height={100}
                    className={styles.carImage}
                  />
                </div>

                {/* Columna de los detalles del coche */}
                <div className={styles.carDetails}>
                  <h3>{car.brand} {car.model}</h3>
                  <p>Año: {car.year}</p>

                  {/* Si es el coche principal, mostramos el badge */}
                  {car.isMainCar && <span className={styles.mainCarBadge}>Coche Principal</span>}
                </div>
              </div>
            ))
          ) : (
            <p>No tienes coches en tu garaje.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
