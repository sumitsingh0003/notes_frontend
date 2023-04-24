import React from "react";

const Header = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light" style={{borderBotton:"1px solid #ddd", background:"#ededed"}}>
          <div className="container">
            <div className="navbar-brand">
              Navbar
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
