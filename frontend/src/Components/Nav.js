import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Nav.css";

const Nav = ({ user, setUser }) => {
  const navStyle = {
    color: "#8f858b",
  };
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return function cleanup() {
      window.removeEventListener("resize", showButton);
    };
  }, []);

  const loginAuth = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=518141647017-rpsvnbf89h0smsrelnndhqn0ooj11oq6.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http%3A//localhost:3000/login&prompt=select_account`;
  };

  const signOut = () => {
    localStorage.removeItem("JWT");
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <h1>LOGO</h1>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            {" "}
            <Link className="nav-links" onClick={closeMobileMenu} to="/">
              About
            </Link>
          </li>
          <li className="nav-item">
            {" "}
            <Link
              className="nav-links"
              onClick={closeMobileMenu}
              to="/articles"
            >
              Articles
            </Link>
          </li>
          <li className="nav-item">
            {" "}
            <Link
              className="nav-links"
              onClick={closeMobileMenu}
              to="/holidays"
            >
              Holidays
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link
                  className="nav-links"
                  onClick={closeMobileMenu}
                  to="/articleswithtasks"
                >
                  Articles and tasks
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link
                  className="nav-links"
                  onClick={closeMobileMenu}
                  to="/contributions"
                >
                  Contributions
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link
                  className="nav-links"
                  onClick={closeMobileMenu}
                  to="/ownarticles"
                >
                  Edit your activities
                </Link>
              </li>
              <li className="nav-item">
                {" "}
                <Link
                  className="nav-links"
                  onClick={closeMobileMenu}
                  to="/ownaccount"
                >
                  Account
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-links"
                  onClick={closeMobileMenu}
                  to="/"
                  onClick={signOut}
                >
                  <button>SIGN OUT</button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                {" "}
                <div className="nav-links">
                  {" "}
                  <button onClick={loginAuth}>LOGIN</button>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
