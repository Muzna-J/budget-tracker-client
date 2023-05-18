import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import authService from "../services/auth.service";
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';


function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // axios.post(`${API_URL}/auth/login`, requestBody

    authService.login(requestBody)
      .then((response) => {
        // console.log("JWT token", response.data.authToken);
        
        storeToken(response.data.authToken);
        return authenticateUser();
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
      	const errorDescription = error.response.data.message;
      	setErrorMessage(errorDescription);
    	})
  };

return (
  <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    <Card className="w-100" style={{ maxWidth: "400px", backgroundColor:' #82c4be' }}>
      <Card.Body>
        <h2 className="text-center mb-4">Login</h2>

        <Form onSubmit={handleLoginSubmit}>
          <Form.Group id="email">
            <Form.Label><strong>Email:</strong></Form.Label>
            <Form.Control type="email" name="email" value={email} onChange={handleEmail} required />
          </Form.Group>

          <Form.Group id="password">
            <Form.Label><strong>Password:</strong></Form.Label>
            <Form.Control type="password" name="password" value={password} onChange={handlePassword} required />
          </Form.Group>

          <Button style={{ backgroundColor: '#e76e50', borderColor: '#123456' }} className="btn mt-3" type="submit">Login</Button>
        </Form>

        { errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert> }
        
        <div className="w-100 text-center mt-3">
          <p>Don't have an account yet?</p>
          <Link to={"/auth/signup"} style={{ backgroundColor: '#006c75', borderColor: '#123456', color: '#ffffff', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px' }}>Sign Up</Link>
        </div>

      </Card.Body>
    </Card>
  </Container>
)
}
export default LoginPage;