// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);

//     const handleLogin = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post('/auth/login', { email, password });
//             const authToken = response.data.authToken;

//             // Store the token in local storage (or wherever you want to store it)
//             localStorage.setItem('authToken', authToken);

//             // Redirect the user to the home page, or wherever you want
//             // replace the following line with your redirection logic
//             // window.location.href = "/";
//         } catch (err) {
//             // Handle error
//             if (err.response) {
//                 // The request was made and the server responded with a status code
//                 setError(err.response.data.message);
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 setError(err.message);
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             {error && <div>{error}</div>}
//             <form onSubmit={handleLogin}>
//                 <label>
//                     Email:
//                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 </label>
//                 <label>
//                     Password:
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 </label>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;

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
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <input type="submit" value="Log In" />
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;

