import React, { useState } from 'react';
import styles from '../login/login.module.css';
import InputField from '../shared/inputfield';
import Logo from '../logo/logo';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e:any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // TODO: Add validation and API call
    console.log('Registering:', formData);
  };

  return (
    <form  className={styles.form} onSubmit={handleSubmit}>
        <Logo />
      <h2 className={styles.alignTextCenter}>Business Registraion</h2>
      <InputField label="Business Name" type="password" value={undefined} onChange={handleChange} />
      <InputField label="Business Email" type="email" value={undefined} onChange={handleChange}  />
      <InputField label="Password" type="password" value={undefined} onChange={handleChange} />
      <button type="submit" className={styles.button}>Sign Up</button>
     
    </form>
  );
};

export default RegistrationForm;