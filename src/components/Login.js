import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { isLoggedIn, logInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      logInUser(response.data.authToken);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="form-group">
      <label>
        Email:
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
      Password:
      <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
    </label>

    <input type="submit" className="btn btn-primary" value="Log In" />
  </form>

  {error && <p className="text-danger">{error}</p>}
</div>
);
}

export default Login;

