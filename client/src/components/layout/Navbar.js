import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../redux/auth";
import { clear_profile } from "../../redux/profile";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

const Navbar = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clear_profile());
    dispatch(logout());
  };

  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{" "}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={handleLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{" "}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <a href='#!'>Developers</a>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.protoType = {
  auth: PropTypes.object.isRequired,
};

export default Navbar;
