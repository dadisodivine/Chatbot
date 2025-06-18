import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../Config/firebase';
import { Link,useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import './SignUp.css';
import '../App.css'
import Navbar from '../Navbar/Navbar';

const SignupForm = () => {
  const navigate = useNavigate();

const handleSubmit = async (formData) => {

  const  username= formData.get('fullName');
  const email= formData.get('email');
  const password= formData.get('password');
  const confirmPassword= formData.get('confirmPassword')
  console.log(username)

   if (!email || !username || !password) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    try {
      // Create user with email and password (Firebase creates user immediately)
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: username });
      await setDoc(doc(db, 'users', res.user.uid), {
        uid: res.user.uid,
        displayName: username,
        email: email,
      });
      await setDoc(doc(db, 'userChat', res.user.uid), {

      });
      // Redirect to chat page after successful signup
      alert('User registered successfully!');
      navigate("/chat")
  
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error registering user:', errorCode, errorMessage);
      const errorMessages = {
        'auth/email-already-in-use': 'An account with this email already exists',
        'auth/invalid-email': 'Invalid email address',
        'auth/operation-not-allowed': 'Email/password accounts are not enabled',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/network-request-failed': 'Network error. Please check your connection'
      };
      
      console.log(errorMessages[error.code] || 'An error occurred during registration');
    }
};
   const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  
  return (
    <>
    <div><Navbar/></div>
    <div className="signup-container">
      <div className="signup-form">
        <div className="user-avatar">
          <div className="avatar-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
        </div>

        <form action={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <div className="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <input
                type="text"
                name="fullName"
                placeholder="Username"
                onKeyPress={handleKeyPress}
                required
              />
            </div>
          </div>

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
                onKeyPress={handleKeyPress}
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
                onKeyPress={handleKeyPress}
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
                name="confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>
          <button type="submit" className="signup-button">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignupForm;