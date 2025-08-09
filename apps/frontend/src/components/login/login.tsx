import React, { useState } from 'react';
import InputField from '../shared/inputfield';
import styles from '../login/login.module.css';
import { Link } from 'react-router-dom';
import Logo from '../logo/logo';


const SignInForm = ({ choice }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

 /*  const handleChange = (e:any) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }; */

   const handleSubmit = (e:any) => {
    e.preventDefault();
    if (validate()) {
      console.log('Logging in with:', { email, password });
      // TODO: Call your login API here
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Logo />
      <h2 className={styles.alignTextCenter}>Sign In</h2>
      <InputField label="Email" type="text" value={undefined} onChange={(e:any) => setEmail(e.target.value)}  />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      <InputField label="Password" type="password" value={undefined} onChange={(e:any) => setPassword(e.target.value)} />
       {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      <button type="submit" className={styles.button}>Login</button>
      <div className={styles.RegistrationText}>
      <Link to="/register" onClick={() => choice('register')}>Register</Link>
      </div>
    </form>
  );
};

export default SignInForm;