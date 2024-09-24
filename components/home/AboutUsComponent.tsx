import React from 'react';
import CarComponent from '../../components/cars/CarComponent';
import styles from '../../styles/home/AboutUs.module.css';

const AboutUs: React.FC = () => {
  return (
    <section className={styles.section} id='about'>
      <h2>Sobre Nosotros</h2>
      <p>Texto introductorio sobre el club y su historia.</p>

      {/* Selector de coches */}
      <div className={styles.carSelector}>
        <h3>Selector de Coches</h3>
        {/* Aquí puedes implementar el selector de coches */}
      </div>
      <CarComponent />

      <p>Texto adicional sobre el club y sus miembros.</p>
    </section>
  )
};

export default AboutUs;
