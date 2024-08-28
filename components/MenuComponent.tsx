import React from 'react';
import styles from '../styles/MenuComponent.module.css';

const MenuComponent: React.FC = () => (
  <nav className={styles.menuContainer}>
    <ul className={styles.menuList}>
      <li className={styles.menuItem}><a href="#">NOTHING (R)</a></li>
      <li className={styles.menuItem}><a href="#">PRODUCTS (3)</a></li>
      <li className={styles.menuItem}><a href="#">LOGIN</a></li>
      <li className={styles.menuItem}><a href="#">CART (0)</a></li>
    </ul>
  </nav>
);

export default MenuComponent;
