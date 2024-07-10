import "../css/landing.css";
import React, { useState, useEffect } from "react";
import Logo from "../assets/know-yourself-logo.png";
import Graph from "../assets/enneagram_graph.png";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("userId")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(sessionStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    setIsLoggedIn(null);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <Link
              className="d-flex align-items-center"
              to="/"
              style={{ textDecoration: "none", color: "#e0b965" }}
            >
              <img
                src={Logo}
                alt="Logo"
                style={{ width: 50, height: "auto", marginRight: "16px" }}
              />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "Cabin",
                  color: "#e0b965",
                  textDecoration: "none",
                  "&:hover": {
                    color: "inherit",
                  },
                }}
              >
                KnowYourself
              </Typography>
            </Link>
          </div>
          {isLoggedIn ? (
            <Link to="/" className="login-button" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/login" className="login-button">
              Login
            </Link>
          )}
        </div>
      </nav>
      <section className="hero-section">
        <div className="container d-flex justify-content-center fs-1 text-white flex-column">
          <div className="row">
            <div
              className="col-lg-6 col-sm-12 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <React.Fragment>
                <h1>Discover your true personality</h1>
                <h2>
                  Discover Your Enneagram Identity and Unleash a Deeper
                  Understanding of Yourself and Those Around You
                </h2>
              </React.Fragment>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <Link to="/test" className="take-the-test">
                  Take the Test
                </Link>
              </div>
            </div>
            <div
              className="col-lg-6 col-sm-12 order-1 order-lg-2 hero-img"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img
                src={Graph}
                alt="enneagram-graph"
                className="enneagram-img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
