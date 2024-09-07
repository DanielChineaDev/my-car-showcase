"use client";

import React, { useState } from 'react';
import styles from '../styles/SignUpModal.module.css';

const SignUpModal: React.FC<{ isOpen: boolean; onClose: () => void; onSwitchToLogin: () => void }> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [agree, setAgree] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0); // Medidor de fuerza de contraseña

  // Expresión regular para validar correos electrónicos
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Expresión regular para validar contraseñas seguras
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Función para capitalizar la primera letra de cada palabra
  const capitalizeWords = (value: string) => {
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Función para filtrar caracteres especiales y manejar espacios
  const filterSpecialCharactersAndSpaces = (value: string) => {
    let filtered = value.replace(/[^a-zA-Z\s]/g, ''); // Solo letras y espacios
    filtered = filtered.replace(/\s+/g, ' '); // Reemplaza múltiples espacios con uno
    filtered = filtered.trimStart(); // Elimina espacios iniciales
    return filtered;
  };

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

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const filteredInput = filterSpecialCharactersAndSpaces(input);
    setFirstName(capitalizeWords(filteredInput));
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const filteredInput = filterSpecialCharactersAndSpaces(input);
    setLastName(capitalizeWords(filteredInput));
  };

  // Validación de email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setEmail(input);

    if (!emailRegex.test(input) && input !== '') {
      setEmailError('Por favor, introduce un email válido');
    } else {
      setEmailError('');
    }
  };

  // Ocultar el error del email al salir del campo si está vacío
  const handleEmailBlur = () => {
    if (email === '') {
      setEmailError('');
    }
  };

  // Controlador para el cambio de contraseña
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPassword(input);
    const strength = calculatePasswordStrength(input);
    setPasswordStrength(strength);

    if (!passwordRegex.test(input) && input !== '') {
      setPasswordError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
    } else {
      setPasswordError('');
    }
  };

  // Ocultar el error de la contraseña si está vacía al perder el foco
  const handlePasswordBlur = () => {
    if (password === '') {
      setPasswordError('');
    }
  };

  const handleCheckboxChange = () => {
    setAgree(!agree);
  };

  if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Panel izquierdo con mensaje de la comunidad */}
        <div className={styles.modalLeft}>
          <h3>Únete a la comunidad de coches más grande</h3>
          <p>Forma parte de algo grande.</p>
        </div>

        {/* Panel derecho con el formulario de registro */}
        <div className={styles.modalRight}>
          <h2>¡Únete al club!</h2>
          <p>
            ¿Ya tienes cuenta? <a href="#" onClick={onSwitchToLogin}>Iniciar sesión</a>
          </p>

          <form className={styles.signupForm}>
            <div className={styles.formRow}>
              <input
                type="text"
                placeholder="Nombre"
                className={styles.input}
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <input
                type="text"
                placeholder="Apellidos"
                className={styles.input}
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className={`${styles.input} ${styles.fullWidth}`}
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />
            {emailError && <p className={styles.errorTextEmail}>{emailError}</p>}

            <input
              type="password"
              placeholder="Contraseña"
              className={`${styles.input} ${styles.fullWidth}`}
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />
            {passwordError && <p className={styles.errorTextPassword}>{passwordError}</p>}

            {/* Barra de fuerza de la contraseña con animación */}
            <div className={styles.passwordStrengthContainer}>
              <div className={styles.passwordStrength}>
                {[...Array(5)].map((_, i) => {
                  const isFilled = i < passwordStrength; // Define si el segmento está lleno o vacío
                  return (
                    <div
                      key={i}
                      className={`${styles.strengthBar} ${isFilled ? styles.filled : ''}`}
                      style={{
                        transition: `background-color ${isFilled ? 0.5 : 0.2}s ${isFilled ? i * 0.1 : (4 - i) * 0.05}s ease-in-out`,
                      }}
                    />
                  );
                })}
              </div>
              <span className={styles.strengthText}>
                {passwordStrength <= 2 ? 'Poco segura' : passwordStrength <= 4 ? 'Segura' : 'Muy segura'}
              </span>
            </div>

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={agree}
                onChange={handleCheckboxChange}
                id="terms-checkbox"
              />
              <label htmlFor="terms-checkbox">
                He leído y acepto los <a href="#">Términos y Condiciones</a>
              </label>
            </div>

            <button className={styles.createAccountButton} disabled={!!emailError || !!passwordError}>
              Unirse
            </button>
          </form>

          <p className={styles.orText}>O regístrate con</p>

          <div className={styles.socialButtons}>
            <button className={styles.socialButton}>
              <img src="../images/brands/google-logo.svg" alt="Google" />
              Google
            </button>
            <button className={styles.socialButton}>
              <img src='../images/brands/apple-logo.svg' alt="Apple" />
              Apple
            </button>
          </div>
        </div>

        <button className={styles.closeModal} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
