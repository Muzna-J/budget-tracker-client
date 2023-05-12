
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { isLoggedIn, logInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/auth/signup', { name, email, password });
      logInUser(response.data.authToken);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <input type="submit" value="Sign Up" />
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default SignUp;
