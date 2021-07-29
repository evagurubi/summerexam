import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ user, setUser }) => {
  const navStyle = {
    color: "#8f858b",
  };

  const loginAuth = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=518141647017-rpsvnbf89h0smsrelnndhqn0ooj11oq6.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http%3A//localhost:3000/login&prompt=select_account`;
  };

  const signOut = () => {
    localStorage.removeItem("JWT");
    setUser(null);
  };

  return (
    <nav>
      <h1>LOGO</h1>
      <ul className="nav-links">
        {user ? (
          <>
            <Link style={navStyle} to="/">
              <li>About</li>
            </Link>
            <Link style={navStyle} to="/articles">
              <li>Articles</li>
            </Link>
            <Link style={navStyle} to="/articleswithtasks">
              <li>Articles and tasks</li>
            </Link>
            <Link style={navStyle} to="/contributions">
              <li>Contributions</li>
            </Link>
            <Link style={navStyle} to="/ownarticles">
              <li>Edit your activities</li>
            </Link>
            <Link style={navStyle} to="/" onClick={signOut}>
              <li>Sign out</li>
            </Link>
          </>
        ) : (
          <>
            <Link style={navStyle} to="/">
              <li>About</li>
            </Link>
            <Link style={navStyle} to="/articles">
              <li>Articles</li>
            </Link>
            <Link style={navStyle} to="/" onClick={loginAuth}>
              <li>Login</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
