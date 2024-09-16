import React from 'react';
import styles from '../../styles/home/MoreInfo.module.css';

const Section3: React.FC = () => {
  return (
    <section className={styles.section3}>
      <h2>Empresas Colaboradoras</h2>

      {/* Carrusel de tarjetas */}
      <div className={styles.carousel}>
        {/* Aquí implementarías tu carrusel de logos */}
      </div>

      {/* Botón para unirse */}
      <button className={styles.joinButton}>Únete al Club</button>

      {/* Indicador de apps futuras */}
      <p>Próximamente disponible en iOS y Android</p>
    </section>
  );
};

export default Section3;
