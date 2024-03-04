import React from "react";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {

  const navigate = useNavigate();
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
   

      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            Care Finder
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Services
              </a>
            </li>

            <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            <li>
              <button
                className="btn-custom"
                style={{ marginTop: 10 }}
                onClick={() => navigate('signup')}
              >
                Sign up
              </button>
            </li>
            <li>
              <button
                className="btn-custom"
                style={{ margin: "10px 0 0 10px" }}
                onClick={() => navigate('login')}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
