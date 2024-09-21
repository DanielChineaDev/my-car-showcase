"use client"; // Asegura que el archivo se ejecute en el cliente

import React, { useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import styles from "../../styles/home/HomeComponent.module.css";
import styles2 from "../../styles/home/AboutUs.module.css";
import styles3 from "../../styles/home/MoreInfo.module.css";
import CarComponent from "../../components/cars/CarComponent";
import LoginModal from "../auth/LoginModal";
import SignUpModal from "../auth/SignUpModal";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const openModal = (src: string) => {
    setVideoSrc(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.section}>
      <video autoPlay muted loop className={styles.backgroundVideo}>
        <source src="/video_home.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
            />
            <img
              src="/images/play_icon.png"
              alt="Play"
              className={styles.playButton}
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
            />
            <img
              src="/images/play_icon.png"
              alt="Play"
              className={styles.playButton}
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
    </div>
  );
};

const AboutUs = () => (
  <section className={styles2.section2}>
    <h2>Sobre Nosotros</h2>
    <p>Texto introductorio sobre el club y su historia.</p>

    {/* Selector de coches */}
    <div className={styles2.carSelector}>
      <h3>Selector de Coches</h3>
      {/* Aquí puedes implementar el selector de coches */}
    </div>
    <CarComponent />

    <p>Texto adicional sobre el club y sus miembros.</p>
  </section>
);

const MoreInfo = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  return (
    <section className={styles3.section3}>
      <h2>Empresas Colaboradoras</h2>

      {/* Carrusel de tarjetas */}
      <div className={styles3.carousel}>
        {/* Aquí implementarías tu carrusel de logos */}
      </div>

      {/* Botón para unirse */}
      <button className={styles3.joinButton} onClick={openSignUpModal}>
        Únete al Club
      </button>

      {/* Indicador de apps futuras */}
      <p>Próximamente disponible en iOS y Android</p>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSwitchToSignUp={openSignUpModal}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={closeSignUpModal}
        onSwitchToLogin={openLoginModal}
      />
    </section>
  );
};

const FullPageSections = () => {
  return (
    <ReactFullpage
      navigation
      sectionsColor={["#282c34", "#ff5f45", "#0798ec"]}
      credits={{ enabled: false }}
      render={() => {
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              <Home />
            </div>
            <div className="section">
              <AboutUs />
            </div>
            <div className="section">
              <MoreInfo />
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export default FullPageSections;
