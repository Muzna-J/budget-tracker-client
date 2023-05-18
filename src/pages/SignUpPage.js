import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    authService.signup(requestBody)
      .then((response) => {
        navigate("/auth/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="w-100" style={{ maxWidth: "400px", backgroundColor: '#82c4be' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>

          <Form onSubmit={handleSignupSubmit}>
            <Form.Group controlId="email">
              <Form.Label><strong>Email:</strong></Form.Label>
              <Form.Control type="email" name="email" value={email} onChange={handleEmail} required />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label><strong>Password:</strong></Form.Label>
              <Form.Control type="password" name="password" value={password} onChange={handlePassword} required />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label><strong>Name:</strong></Form.Label>
              <Form.Control type="text" name="name" value={name} onChange={handleName} required />
            </Form.Group>

            <Button style={{ backgroundColor: '#e76e50', borderColor: '#123456' }} className="btn mt-3" type="submit">Sign Up</Button>
          </Form>

          {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}

          <div className="w-100 text-center mt-3">
            <p>Already have an account?</p>
            <Link to={"/auth/login"} style={{ backgroundColor: '#006c75', borderColor: '#123456', color: '#ffffff', textDecoration: 'none', padding: '10px 20px', borderRadius: '5px' }}>Login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SignupPage;
