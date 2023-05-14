import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      {isLoggedIn && (
        <>
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
        
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/auth/signup"> <button>Sign Up</button> </Link>
          <Link to="/auth/login"> <button>Login</button> </Link>
        </>
      )}      
    </nav>
  );
}

export default Navbar;