// import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const LoginForm = () => {
  const { login, error, loading } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);

    setEmail('');
    setPassword('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input
          className="login-form-input"
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input
          className="login-form-input"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" class="form-submit">
        Login
      </button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
};

export default LoginForm;
