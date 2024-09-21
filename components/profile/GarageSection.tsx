import React from 'react';
import Image from 'next/image'; // Para optimizar las imágenes con Next.js
import styles from '../../styles/profile/GarageSection.module.css';

interface Car {
  brand: string;
  model: string;
  year: string;
  imageUrl: string;
  isMainCar: boolean; // Si es el coche principal
}

interface GarageSectionProps {
  cars?: Car[]; // Lista de coches obtenida de Firebase
}

const GarageSection: React.FC<GarageSectionProps> = ({ cars = [] }) => {
  console.log('Coches recibidos en GarageSection:', cars); // Verifica si los coches están siendo pasados correctamente

  return (
    <div className={styles.garageSection}>
      <h2 className={styles.sectionTitle}>Mi Garaje</h2>
      <div className={styles.carList}>
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <div key={index} className={styles.carCard}>
              {/* Columna de la imagen del coche */}
              <div className={styles.carImageContainer}>
                <Image
                  src={car.imageUrl || '/default-car.jpg'} // Carga una imagen predeterminada si no hay URL
                  alt={`${car.brand} ${car.model}`}
                  width={150} // Ajusta el ancho de la imagen
                  height={100} // Ajusta la altura de la imagen
                  className={styles.carImage}
                />
              </div>

              {/* Columna de los detalles del coche */}
              <div className={styles.carDetails}>
                <h3>{car.brand} {car.model}</h3>
                <p>Año: {car.year}</p>

                {/* Si es el coche principal, mostramos el badge */}
                {car.isMainCar && (
                  <span className={styles.mainCarBadge}>Coche Principal</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No tienes coches en tu garaje.</p>
        )}
      </div>
    </div>
  );
};

export default GarageSection;
