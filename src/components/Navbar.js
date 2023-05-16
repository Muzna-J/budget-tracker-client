import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {isLoggedIn && (
          <>
            <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/income">Incomes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/expense">Expenses</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={logOutUser}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        )}
  
        {!isLoggedIn && (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/auth/signup">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/auth/login">Login</Link>
              </li>
            </ul>
          </div>
        )}      
      </nav>
    );
  }
  
  export default Navbar;
  