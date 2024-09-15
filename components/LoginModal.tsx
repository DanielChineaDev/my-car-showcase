"use client";

import React, { useState } from 'react';
import styles from '../styles/LoginModal.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { auth } from '../firebaseConfig';  // Firebase auth
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import slide_image_1 from '../public/images/background_modal.jpg';
import slide_image_2 from '../public/images/hyundai-i20n.jpg';
import slide_image_3 from '../public/images/golf-r.jpg';

const LoginModal: React.FC<{ isOpen: boolean; onClose: () => void; onSwitchToSignUp: () => void }> = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar si se está enviando el formulario

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  // Función para iniciar sesión con correo y contraseña
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Comienza el envío
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();  // Cierra el modal al iniciar sesión correctamente
    } catch (error: any) {
      setFirebaseError('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsSubmitting(false); // Finaliza el envío
    }
  };

  // Función para iniciar sesión con Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onClose();  // Cierra el modal al iniciar sesión correctamente
    } catch (error: any) {
      setFirebaseError('Error al iniciar sesión con Google.');
    }
  };

  // Toggle para mostrar/ocultar contraseña
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  if (!isOpen) return null;  // No renderiza nada si el modal no está abierto

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Panel izquierdo con el formulario de inicio de sesión */}
        <div className={styles.modalLeft}>
          <h2>¡Nos alegra verte de nuevo!</h2>
          <p>
            ¿No tienes cuenta? <a href="#" onClick={() => { onClose(); onSwitchToSignUp(); }}>Regístrate</a>
          </p>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className={`${styles.input} ${styles.fullWidth}`}
              value={email}
              onChange={handleEmailChange}
              required
            />

            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                className={`${styles.input} ${styles.fullWidth}`}
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button type="button" className={styles.passwordToggle} onClick={togglePasswordVisibility}>
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>

            {firebaseError && <p className={styles.errorText}>{firebaseError}</p>}

            <button className={styles.createAccountButton} type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span> Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          <p className={styles.orText}>O inicia sesión con</p>

          <div className={styles.socialButtons}>
            <button className={styles.socialButton} onClick={handleGoogleLogin}>
              <img src="../images/brands/google-logo.svg" alt="Google" />
              Google
            </button>
            <button className={styles.socialButton}>
              <img src="../images/brands/apple-logo.svg" alt="Apple" />
              Apple
            </button>
          </div>
        </div>

        {/* Panel derecho con el carrusel */}
        <div className={styles.modalRight}>
        <Swiper
            slidesPerView={'auto'}
            pagination={{ clickable: false }}
            loop={true}
            spaceBetween={2.5}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            allowTouchMove={false}
            speed={750}
            modules={[Pagination, Autoplay]}
            className={styles.mySwiper}
          >
            <SwiperSlide>
              <Image src={slide_image_1} alt="slide_image_1" layout="fill" objectFit="cover" draggable={false} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={slide_image_2} alt="slide_image_2" layout="fill" objectFit="cover" draggable={false} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={slide_image_3} alt="slide_image_3" layout="fill" objectFit="cover" draggable={false} />
            </SwiperSlide>
          </Swiper>
          <div className={styles.carouselText}>
            <h2>Bienvenido de vuelta</h2>
            <p>Inicia sesión para continuar</p>
          </div>
        </div>

        <button className={styles.closeModal} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
