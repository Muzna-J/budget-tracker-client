import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>MyApp</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {isLoggedIn && (
          <Nav className="mr-auto">
            <LinkContainer to="/dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/incomes">
              <Nav.Link>Incomes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/expenses">
              <Nav.Link>Expenses</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={logOutUser}>Logout</Nav.Link>
          </Nav>
        )}

        {!isLoggedIn && (
          <Nav className="mr-auto">
            <LinkContainer to="/auth/signup">
              <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/auth/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        )}
        <Nav>
          <Navbar.Text>
            {user && user.name}
          </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
