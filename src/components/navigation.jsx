import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar, Nav, Container } from 'react-bootstrap';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const role = user ? user.role : 'guest';

  return (
    <Navbar
      expand="lg"
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
        backgroundColor: "#f8f9fa",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Container>
        <Navbar.Brand href="/#page-top">
          <img
            src="img/logo-01.png"
            alt="logo"
            style={{
              height: "auto",
              width: "20rem",
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive">
          <span>
            <span
              style={{
                display: "inline-block",
                height: "2px",
                backgroundColor: "#333",
                width: "25px",
                borderRadius: "5px",
                position: "relative",
              }}
            />
          </span>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarResponsive">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Item>
                  <Link
                    to="/companies"
                    className="nav-link"
                    style={{
                      color: "#333",
                      fontWeight: "500",
                      margin: "0 10px",
                      textDecoration: "none",
                    }}
                  >
                    Company
                  </Link>
                </Nav.Item>
                {role === 'requester' && (
                  <Nav.Item>
                    <Link
                      to="/requests"
                      className="nav-link"
                      style={{
                        color: "#333",
                        fontWeight: "500",
                        margin: "0 10px",
                        textDecoration: "none",
                      }}
                    >
                      Request
                    </Link>
                  </Nav.Item>
                )}
                {role === 'youthEnterprise' && (
                  <Nav.Item>
                    <Link
                      to="/requested"
                      className="nav-link"
                      style={{
                        color: "#333",
                        fontWeight: "500",
                        margin: "0 10px",
                        textDecoration: "none",
                      }}
                    >
                      Requested
                    </Link>
                  </Nav.Item>
                )}
                {role === 'allianceAdmin' && (
                  <>
                    <Nav.Item>
                      <Link
                        to="/admin-dashboard"
                        className="nav-link"
                        style={{
                          color: "#333",
                          fontWeight: "500",
                          margin: "0 10px",
                          textDecoration: "none",
                        }}
                      >
                        Dashboard
                      </Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Link
                        to="/admin-user-management"
                        className="nav-link"
                        style={{
                          color: "#333",
                          fontWeight: "500",
                          margin: "0 10px",
                          textDecoration: "none",
                        }}
                      >
                        User Management
                      </Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Link
                        to="/all-requested"
                        className="nav-link"
                        style={{
                          color: "#333",
                          fontWeight: "500",
                          margin: "0 10px",
                          textDecoration: "none",
                        }}
                      >
                        Requested
                      </Link>
                    </Nav.Item>
                  </>
                )}
                <Nav.Item className="d-flex align-items-center">
                  <img
                    src="../img/actor.png"
                    alt="User Icon"
                    style={{
                      width: "30px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  <span style={{ fontWeight: "500", color: "#333" }}>
                    {user.username}
                  </span>
                </Nav.Item>
                <Link to="/#page-top">
                <Nav.Item>

                
                  <button
                    onClick={logout}
                    href="/#page-top"
                    className="btn btn-link nav-link"
                    style={{
                      color: "#007bff",
                      background: "none",
                      border: "none",
                      padding: 0,
                      textDecoration: "none",
                      marginLeft: "10px",
                    }}
                  >
                    Logout
                  </button>
                </Nav.Item>
                </Link>
              </>
            ) : (
              <>
                <Nav.Item>
                  <a
                    href="/#services"
                    className="nav-link"
                    style={{
                      color: "#333",
                      fontWeight: "500",
                      margin: "0 10px",
                      textDecoration: "none",
                    }}
                  >
                    Services
                  </a>
                </Nav.Item>
                <Nav.Item>
                  <a
                    href="/#about"
                    className="nav-link"
                    style={{
                      color: "#333",
                      fontWeight: "500",
                      margin: "0 10px",
                      textDecoration: "none",
                    }}
                  >
                    About
                  </a>
                </Nav.Item>
                <Nav.Item>
                  <a
                    href="/#features"
                    className="nav-link"
                    style={{
                      color: "#333",
                      fontWeight: "500",
                      margin: "0 10px",
                      textDecoration: "none",
                    }}
                  >
                    Features
                  </a>
                </Nav.Item>
                <Nav.Item>
                  <a
                    href="/#portfolio"
                    className="nav-link"
                    style={{
                      color: "#333",
                      fontWeight: "500",
                      margin: "0 10px",
                      textDecoration: "none",
                    }}
                  >
                    Gallery
                  </a>
                </Nav.Item>
                <Nav.Item>
                  <a
                    href="/#testimonials"
                    className="nav-link"
                    style={{
                      color: "#333",
                      fontWeight: "500",
                      margin: "0 10px",
                      textDecoration: "none",
                    }}
                  >
                    Testimonials
                  </a>
                </Nav.Item>
                <Nav.Item>
                  <a
                    href="/#team"
                    className="nav-link"
                    style={{
                      color: "#333",
                      fontWeight: "500",
                      margin: "0 10px",
                      textDecoration: "none",
                    }}
                  >
                    Team
                  </a>
                </Nav.Item>
                <Nav.Item>
                  <a
                    href="/#contact"
                    className="nav-link"
                    style={{
                      color: "#333",
                      fontWeight: "500",
                      margin: "0 10px",
                      textDecoration: "none",
                    }}
                  >
                    Contact
                  </a>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    to="/login"
                    className="nav-link"
                    style={{
                      color: "#333",
                      fontWeight: "500",
                      margin: "0 10px",
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
