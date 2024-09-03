import React, { useEffect, useState } from 'react';
import styles from '../styles/CarStats.module.css';

interface CarStatsProps {
  topSpeed: number;
  acceleration: number;
  handling: number;
}

const CarStats: React.FC<CarStatsProps> = ({ topSpeed, acceleration, handling }) => {
  const [barPositions, setBarPositions] = useState({ topSpeed: 0, acceleration: 0, handling: 0 });

  useEffect(() => {
    setBarPositions({ topSpeed, acceleration, handling });
  }, [topSpeed, acceleration, handling]);

  const renderSegments = (filledSegments: number, yellowBarPosition: number) => {
    return (
      <div className={styles.statBar}>
        {[...Array(5)].map((_, i) => {
          const isFilled = i < Math.round(yellowBarPosition);
          return (
            <div
              key={i}
              className={`${styles.statSegment} ${isFilled ? styles.filled : styles.unfilled}`}
              style={{
                transition: `background-color ${isFilled ? 0.5 : 0.2}s ${isFilled ? i * 0.1 : (4 - i) * 0.05}s ease-in-out`,
              }}
            />
          );
        })}
        <div
          className={styles.yellowBar}
          style={{
            left: `${yellowBarPosition * 19.5}%`,
            transition: 'left 0.5s ease-in-out',
          }}
        />
      </div>
    );
  };

  return (
    <div className={styles.statsContainer}>
      <div className={styles.stat}>
        <div className={styles.statLabel}>VELOCIDAD MÁXIMA</div>
        {renderSegments(topSpeed, barPositions.topSpeed)}
      </div>
      <div className={styles.stat}>
        <div className={styles.statLabel}>ACELERACIÓN</div>
        {renderSegments(acceleration, barPositions.acceleration)}
      </div>
      <div className={styles.stat}>
        <div className={styles.statLabel}>MANEJO</div>
        {renderSegments(handling, barPositions.handling)}
      </div>
    </div>
  );
};

export default CarStats;
