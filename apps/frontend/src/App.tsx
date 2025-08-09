import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignInPage from './components/login/login';
import RegisterPage from './components/Registration/registration';
import SignInForm from './components/login/login';

function App() {
  const [choice, setState] = useState('login');
  const handleChoice = (choice: string) => {
    setState(choice)
  }

  return (
    <Router>
      {
        choice == 'login' ? <SignInForm choice={handleChoice} /> : <RegisterPage />
      }
      {/* <nav>
        <Link onClick={() => handleChoice('login')}>Sign In</Link> | <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes> */}
    </Router>
  );
}

export default App;