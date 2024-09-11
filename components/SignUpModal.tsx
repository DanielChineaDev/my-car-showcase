"use client";

import React, { useState } from 'react';
import styles from '../styles/SignUpModal.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { auth, db } from '../firebaseConfig'; // Importamos Firebase Auth y Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import slide_image_1 from '../public/images/background_modal.jpg';
import slide_image_2 from '../public/images/hyundai-i20n.jpg';
import slide_image_3 from '../public/images/golf-r.jpg';

const SignUpModal: React.FC<{ isOpen: boolean; onClose: () => void; onSwitchToLogin: () => void }> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0); // Medidor de fuerza de contraseña
  const [agree, setAgree] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña

  // Función para medir la fuerza de la contraseña
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    return strength; // Devuelve un valor entre 0 y 5
  };

  // Manejadores de cambio de input
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPassword(input);
    setPasswordStrength(calculatePasswordStrength(input));
  };

  const handleCheckboxChange = () => setAgree(!agree); // Checkbox para aceptar términos

  // Función para crear usuario en Firebase Authentication y guardar en Firestore
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!agree) {
      setFirebaseError('Debes aceptar los términos y condiciones.');
      setIsSubmitting(false);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar el usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        avatarUrl: "",
        cars: [],
        role: "user",
        accountStatus: "active",
        registrationDate: new Date(),
        suspensionCount: 0,
        totalPoints: 0,
        violations: []
      });

      // Limpiar el formulario y cerrar el modal
      onClose();
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setAgree(false);
    } catch (error: any) {
      setFirebaseError('Error al crear la cuenta. Verifica tus datos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null; // No renderizar si el modal no está abierto

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Panel izquierdo con mensaje de la comunidad */}
        <div className={styles.modalLeft}>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className={styles.mySwiper}
          >
            <SwiperSlide>
              <Image src={slide_image_1} alt="slide_image_1" layout="fill" objectFit="cover" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={slide_image_2} alt="slide_image_2" layout="fill" objectFit="cover" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={slide_image_3} alt="slide_image_3" layout="fill" objectFit="cover" />
            </SwiperSlide>
          </Swiper>

          {/* Texto centrado sobre el carrusel */}
          <div className={styles.carouselText}>
            <h3>Bienvenido al club de coches más grande de Canarias</h3>
            <p>Forma parte de algo único...</p>
          </div>
        </div>

        {/* Panel derecho con el formulario de registro */}
        <div className={styles.modalRight}>
          <h2>¡Únete a la comunidad!</h2>
          <p>
            ¿Ya tienes cuenta? <a href="#" onClick={onSwitchToLogin}>Inicia sesión</a>
          </p>

          <form className={styles.signupForm} onSubmit={handleSignUp}>
            <div className={styles.formRow}>
              <input
                type="text"
                placeholder="Nombre"
                className={styles.input}
                value={firstName}
                onChange={handleFirstNameChange}
                required
              />
              <input
                type="text"
                placeholder="Apellidos"
                className={styles.input}
                value={lastName}
                onChange={handleLastNameChange}
                required
              />
            </div>

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
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '🙈'}
              </button>
            </div>

            {/* Medidor de fuerza de contraseña */}
            <div className={styles.passwordStrengthContainer}>
              <div className={styles.passwordStrength}>
                {[...Array(5)].map((_, i) => {
                  const isFilled = i < passwordStrength; // Define si el segmento está lleno o vacío
                  return (
                    <div
                      key={i}
                      className={`${styles.strengthBar} ${isFilled ? styles.filled : ''}`}
                    />
                  );
                })}
              </div>
              <span className={styles.strengthText}>
                {passwordStrength <= 2 ? 'Poco segura' : passwordStrength <= 4 ? 'Segura' : 'Muy segura'}
              </span>
            </div>

            {/* Checkbox para aceptar términos */}
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={agree}
                onChange={handleCheckboxChange}
                id="terms-checkbox"
                required
              />
              <label htmlFor="terms-checkbox">
                He leído y acepto los <a href="#">Términos y Condiciones</a>
              </label>
            </div>

            {firebaseError && <p className={styles.errorText}>{firebaseError}</p>}

            <button className={styles.createAccountButton} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creando cuenta...' : 'Únete'}
            </button>
          </form>
        </div>

        <button className={styles.closeModal} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
