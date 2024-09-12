import React from 'react';
import styles from '../styles/HomeComponent.module.css';

const Section1: React.FC = () => {
  return (
    <section className={styles.section1}>
      <video autoPlay muted loop className={styles.backgroundVideo}>
        <source src="/path-to-your-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Tarjeta pequeña con video (superior derecha) */}
      <div className={`${styles.card} ${styles.topRight}`}>
        <video autoPlay muted loop className={styles.cardVideo}>
          <source src="/path-to-your-small-video.mp4" type="video/mp4" />
        </video>
        <h3>Tarjeta con Video</h3>
      </div>

      {/* Eslogan en el centro */}
      <div className={styles.slogan}>
        <h1>El mejor club de coches</h1>
      </div>

      {/* Tarjeta pequeña con video (inferior izquierda) */}
      <div className={`${styles.card} ${styles.bottomLeft}`}>
        <video autoPlay muted loop className={styles.cardVideo}>
          <source src="/path-to-your-small-video.mp4" type="video/mp4" />
        </video>
        <h3>Tarjeta con Video</h3>
      </div>
    </section>
  );
};

export default Section1;
