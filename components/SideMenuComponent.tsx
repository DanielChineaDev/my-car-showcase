import React from 'react';
import styles from '../styles/SideMenuComponent.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
      <img src="/revenge_logo.svg" alt="Revenge Logo" />
      </div>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <span className={styles.text}>Overview</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>🛠</span>
          <span className={styles.text}>Hire Freelancer</span>
          <span className={styles.badge}>4</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>💳</span>
          <span className={styles.text}>Payment</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>📦</span>
          <span className={styles.text}>My Order</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>⚙</span>
          <span className={styles.text}>Admin Setting</span>
        </li>
        <hr />
        <li className={styles.menuItem}>
          <span className={styles.icon}>🏢</span>
          <span className={styles.text}>Add Organisation</span>
          <span className={styles.badge}>8</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>🛍</span>
          <span className={styles.text}>My Products</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>📦</span>
          <span className={styles.text}>Stocks</span>
        </li>
        <hr />
        <li className={styles.menuItem}>
          <span className={styles.icon}>🔧</span>
          <span className={styles.text}>Account Setup</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>👤</span>
          <span className={styles.text}>Manage User</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>🚪</span>
          <span className={styles.text}>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
