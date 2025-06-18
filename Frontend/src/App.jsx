import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatBot from "./Chat/Chat";
import Login from './Login/Login';
import { useContext } from 'react'
import { AuthContext } from './Context/AuthContext'
import Signup from './SignUp/SignUp';

function App() {
  const {Currentuser} = useContext(AuthContext)
  console.log(Currentuser)

  const ProtectedRoute = ({ children }) => {
    if (!Currentuser) {
      return <Navigate to="/" replace />
    }
    return children
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path='chat' element={<ProtectedRoute><ChatBot/></ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;