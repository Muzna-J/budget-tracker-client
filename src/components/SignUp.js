
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import 'bootstrap/dist/css/bootstrap.css';


function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { logInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL+'/auth/signup', { name, email, password });
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
          Name:
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Email:
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Password:
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <input type="submit" className="btn btn-primary" value="Sign Up" />
      </form>

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default SignUp;
