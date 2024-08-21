import React from 'react';
import styles from '../styles/MenuComponent.module.css';

const MenuComponent: React.FC = () => (
  <div className={styles.menuContainer}>
    <div className={styles.menuItem}>NOTHING (R)</div>
    <div className={styles.menuItem}>PRODUCTS (3)</div>
    <div className={styles.menuItem}>LOGIN</div>
    <div className={styles.menuItem}>CART (0)</div>
  </div>
);

export default MenuComponent;
