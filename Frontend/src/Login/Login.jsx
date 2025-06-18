import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Config/firebase';
import { useState } from 'react';
import './Login.css';
import '../App.css'
import Navbar from '../Navbar/Navbar';

const LoginForm = () => {
  
   const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    setError(''); // Clear any previous errors

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/chat');
    } catch (error) {
      const errorMessages = {
        'auth/invalid-email': 'Invalid email address',
        'auth/user-disabled': 'This account has been disabled',
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later',
        'auth/network-request-failed': 'Network error. Please check your connection'
      };
      
      setError(errorMessages[error.code] || 'An error occurred during login');
    }
  };
  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Add forgot password logic here
  };

  return (
    <>
    <div>
    <Navbar/>
    </div>
    <div className="login-container">
      <div className="login-form">
        <div className="user-avatar">
          <div className="avatar-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>

        <form action={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe" 
              />
              <span className="checkmark"></span>
              Remember Me
            </label>
            
            <button 
              type="button" 
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
    </>
  );
};


export default LoginForm;