import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const role = user ? user.role : 'guest'; 

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
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand page-scroll" href="/#page-top">
            <img src="img/logo-01.png" alt="logo" style={{height: "inherit", width: "20rem", marginTop: "-1rem" }} />
          </a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            {user ? (
              <>
                <li>
                  <Link to="/companies" className="page-scroll">
                    Company
                  </Link>
                </li>
                {/* <li>
                  <Link to="/chat" className="page-scroll">
                    Messages
                  </Link>
                </li> */}
                {role === 'requester' && (
                  <li>
                    <Link to="/requests" className="page-scroll">
                      Request
                    </Link>
                  </li>
                )}
                {role === 'youthEnterprise' && (
                  <>
                    {/* <li>
                      <Link to="/youth-dashboard" className="page-scroll">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/youth-profile" className="page-scroll">
                        Profile
                      </Link>
                    </li> */}
                    <li>
                      <Link to="/requested" className="page-scroll">
                        Requested
                      </Link>
                    </li>
                  </>
                )}
                {role === 'allianceAdmin' && (
                  <>
                    <li>
                      <Link to="/admin-dashboard" className="page-scroll">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin-user-management" className="page-scroll">
                        User Management
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/admin-messages" className="page-scroll">
                        Messages
                      </Link>
                    </li> */}
                    <li>
                      <Link to="/all-requested" className="page-scroll">
                        Requested
                      </Link>
                    </li>
                  </>
                )}
                <li className="navbar-user">
                  <img src="../img/actor.png" alt="User Icon" className="user-icon" />
                  <span>{user.username}</span>
                </li>
                <li>
                  <Link to="/#page-top">
                    <button href="/#page-top" onClick={logout} className="btn btn-link logout-button">
                      Logout
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/#services" className="page-scroll">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/#about" className="page-scroll">
                    About
                  </a>
                </li>
                <li>
                  <a href="/#features" className="page-scroll">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/#portfolio" className="page-scroll">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="/#testimonials" className="page-scroll">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="/#team" className="page-scroll">
                    Team
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="page-scroll">
                    Contact
                  </a>
                </li>
                <li>
                  <Link to="/login" className="page-scroll">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
