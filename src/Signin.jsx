import React, { useState } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = e => {
    e.preventDefault();
  
    // Example dummy check (replace with real API call)
    if (email === 'inthalokesh@gmail.com' && password === 'Loki@123') {
      // Redirect to homepage
      navigate('/homepage');
    } else {
      alert('Invalid credentials');
    }
  };
  

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>🔐 Sign In</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
        <p className="signin-footer">Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
};

export default SignIn;
