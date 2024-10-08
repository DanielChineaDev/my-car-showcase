import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Para optimizar las imágenes con Next.js
import { Swiper, SwiperSlide } from "swiper/react"; // Importamos Swiper normalmente
import "swiper/css"; // Importamos los estilos básicos de Swiper
import "swiper/css/navigation"; // Importa estilos para la navegación
import { Navigation } from 'swiper/modules'; // Módulo de navegación
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
    cars: Car[];
  };
}

const GeneralSection: React.FC<GeneralSectionProps> = ({ user }) => {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
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

  const sortedCars = [...user.cars].sort((a, b) => (a.isMainCar ? -1 : 1));

  return (
    <div className={styles.pageContainer}>
      {/* Tarjeta del perfil */}
      <div className={styles.profileCard}>
        {/* Contenido del perfil */}
        <div className={styles.headerBackground}>
          <Image
            className={styles.headerImage}
            src={user.headerImageUrl}
            alt="Header Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />

          <Image
            className={styles.profilePicture}
            src={user.avatarUrl}
            alt={`${user.firstName} ${user.lastName}`}
            width={96}
            height={96}
            priority
          />
        </div>  
        <div className={styles.content}>
          <div className={styles.profileInfo}>
            <div>
              <h2 className={styles.name}>{user.firstName} {user.lastName}</h2>
              <span className={styles.jobTitle}>{getRoleLabel(user.role)}</span>
            </div>
            <button className={styles.editButton}>Editar Perfil</button>
          </div>
          <p className={styles.bio}>{user.bio}</p>
  
          {/* Redes sociales */}
          <div className={styles.badges}>
            <div className={`${styles.badge} ${styles.pill}`}>
              <a href={user.social.instagram} target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/icons/instagram.svg" // Ruta del icono de Instagram
                  alt="Instagram"
                  width={36} // Ancho de la imagen
                  height={36} // Alto de la imagen
                  className={styles.icon}
                />
                <span>Instagram</span>
              </a>
            </div>
            <div className={`${styles.badge} ${styles.pill}`}>
              <a href={user.social.twitter} target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/icons/x.svg" // Ruta del icono de Twitter
                  alt="Twitter"
                  width={16} // Ancho de la imagen
                  height={16} // Alto de la imagen
                  className={styles.icon}
                />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
  
      {/* Tarjeta del garaje */}
      {isClient && (
        <div className={styles.garageCard}>
          <h2 className={styles.sectionTitle}>Mi Garaje</h2>

          <Swiper
            spaceBetween={20}
            slidesPerView={1.2}
            navigation={true}
            loop={true}
            modules={[Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
            }}
          >
            {sortedCars.length > 0 ? (
              sortedCars.map((car, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={styles.carCard}
                    style={{
                      backgroundImage: `url(${car.imageUrl || '/default-car.jpg'})`,
                    }}
                  >
                    {/* Badge de coche principal */}
                    {car.isMainCar && <span className={styles.mainCarBadge}>Principal</span>}
                    <div className={styles.carDetails}>
                      <h3>
                        {car.brand} {car.model}
                      </h3>
                      <p>Año: {car.year}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p>No tienes coches en tu garaje.</p>
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
  
};

export default GeneralSection;
