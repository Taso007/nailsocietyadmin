import './login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../../firebaseConfig';
import { useAuth } from '../../security/AuthContext';

const LogIn = () => { 
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const onLogin = async (e) => {
    e.preventDefault(); 
    try {
      await signInWithEmailAndPassword(auth, email, password); 
      login();
      navigate('/home');
    } catch (err) {
      alert("Email or Password is incorrect, please try again.");
    }
  };

  return ( 
    <>
      <main>
        <section className="auth-section">
          <div className="auth-container">
            <h1>Log in</h1>
            <form onSubmit={onLogin} className="auth-form">
              <div className="form-group">
                <label htmlFor="email" className='login-label'>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  required
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className='login-label'>Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group btn-container">
                <button type="submit" className='btn btn-primary login-but'>
                  Log In
                </button>                
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default LogIn;
