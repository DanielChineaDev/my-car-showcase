"use client";

import React, { useState } from "react";
import styles from "../../styles/home/HomeComponent.module.css";

// Sección Home con Parallax
const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const openModal = (src: string) => {
    setVideoSrc(src);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <section className={styles.section} id="home">
      <div className={styles.videoWrapper}>
        <video autoPlay muted loop className={styles.backgroundVideo}>
          <source src="/video_home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.blurOverlay}></div>
      </div>
      <div className={styles.slogan}>
        <h1 className={styles.animatedTitle}>Forma parte de la leyenda</h1>
        <p className={styles.animatedSubtitle}>
          Descubre nuestras historias y eventos
        </p>
      </div>

      <div className={styles.cardContainer}>
        <div
          className={styles.card}
          onClick={() => openModal("/video_home.mp4")}
        >
          <div className={styles.cardImageContainer}>
            <img
              src="/images/hyundai-i20n.jpg"
              alt="Video Splash 1"
              className={styles.cardImage}
              draggable={false}
            />
            <img
              src="/images/play_icon.png"
              alt="Play"
              className={styles.playButton}
              draggable={false}
            />
          </div>
          <h3 className={styles.cardTitle}>¿Quiénes somos?</h3>
        </div>

        <div
          className={styles.card}
          onClick={() => openModal("/video_home.mp4")}
        >
          <div className={styles.cardImageContainer}>
            <img
              src="/images/background_modal.jpg"
              alt="Video Splash 2"
              className={styles.cardImage}
              draggable={false}
            />
            <img
              src="/images/play_icon.png"
              alt="Play"
              className={styles.playButton}
              draggable={false}
            />
          </div>
          <h3 className={styles.cardTitle}>Eventos</h3>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <video controls autoPlay className={styles.modalVideo}>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
