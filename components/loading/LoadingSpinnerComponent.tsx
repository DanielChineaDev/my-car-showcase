// components/LoadingSpinner.tsx
import React from 'react';
import styles from '../../styles/LoadingSpinnerComponent.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p className='pStyles'>Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;
