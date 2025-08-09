import React from 'react';
import styles from '../login/login.module.css';
import logo from '../../assets/logo.png'

const Logo = () => (
  <div className={styles.inputGroup}>
    <img src={logo} alt="logo" className={styles.logo} />
  </div>
);

export default Logo;