"use client";

import React, { useState } from 'react';
import styles from '../styles/HomeComponent.module.css';

const Section1: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  const openModal = (src: string) => {
    setVideoSrc(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className={styles.section1}>
      <video autoPlay muted loop className={styles.backgroundVideo}>
        <source src="/video_home.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Primera tarjeta en la parte superior derecha */}
      <div className={`${styles.cardContainer} ${styles.topRight}`}>
        <div className={styles.card} onClick={() => openModal('/video_home.mp4')}>
          <img src="/images/background_modal.jpg" alt="Video Splash 1" className={styles.cardImage} />
          <img src="/images/play_icon.png" alt="Play" className={styles.playButton} /> {/* Imagen de play */}
        </div>
        <h3 className={styles.cardTitle}>¿Quiénes somos?</h3>
      </div>

      <div className={styles.slogan}>
        <h1>Forma parte de la leyenda</h1>
      </div>

      {/* Segunda tarjeta en la parte inferior izquierda */}
      <div className={`${styles.cardContainer} ${styles.bottomLeft}`}>
        <div className={styles.card} onClick={() => openModal('/video_home.mp4')}>
          <img src="/images/background_modal.jpg" alt="Video Splash 2" className={styles.cardImage} />
          <img src="/images/play_icon.png" alt="Play" className={styles.playButton} /> {/* Imagen de play */}
        </div>
        <h3 className={styles.cardTitle}>Eventos</h3>
      </div>

      {/* Modal del video */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <video controls autoPlay className={styles.modalVideo}>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default Section1;
