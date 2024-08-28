import React from 'react';
import styles from '../styles/CarStats.module.css';

interface CarStatsProps {
  topSpeed: number; // Número de segmentos llenos (0-5)
  acceleration: number; // Número de segmentos llenos (0-5)
  handling: number; // Número de segmentos llenos (0-5)
}

const CarStats: React.FC<CarStatsProps> = ({ topSpeed, acceleration, handling }) => {
  const renderSegments = (filledSegments: number, yellowBarPosition: number) => {
    return (
      <div className={styles.statBar}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`${styles.statSegment} ${i < filledSegments ? styles.filled : ''}`}
          />
        ))}
        <div className={styles.yellowBar} style={{ left: `${yellowBarPosition * 20}%` }}></div>
      </div>
    );
  };

  return (
    <div className={styles.statsContainer}>
      <div className={styles.stat}>
        <div className={styles.statLabel}>TOP SPEED</div>
        {renderSegments(topSpeed, topSpeed)} {/* El valor `topSpeed` también marca la posición de la barra amarilla */}
      </div>
      <div className={styles.stat}>
        <div className={styles.statLabel}>ACCELERATION</div>
        {renderSegments(acceleration, acceleration)} {/* El valor `acceleration` también marca la posición de la barra amarilla */}
      </div>
      <div className={styles.stat}>
        <div className={styles.statLabel}>HANDLING</div>
        {renderSegments(handling, handling)} {/* El valor `handling` también marca la posición de la barra amarilla */}
      </div>
    </div>
  );
};

export default CarStats;
