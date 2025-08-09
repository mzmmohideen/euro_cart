import React from 'react';
import styles from '../login/login.module.css';

const InputField = ({ label, type, value, onChange }) => (
  <div className={styles.inputGroup}>
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} required />
  </div>
);

export default InputField;