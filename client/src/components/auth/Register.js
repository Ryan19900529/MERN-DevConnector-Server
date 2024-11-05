import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeAlert, setAlert } from "../../redux/alert";
import { registerSuccess, registerFail } from "../../redux/auth";
// import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();

  const onChange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value }); //The syntax [e.target.name] tells JavaScript to evaluate e.target.name as an expression and use its resulting value as the property key.

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      const alertId = uuidv4();
      dispatch(
        setAlert({
          id: alertId,
          msg: "Passwords do not match",
          alertType: "danger",
        })
      );
      setTimeout(() => dispatch(removeAlert(alertId)), 5000);

      // console.log("Passwords do not match");
    } else {
      // const newUser = {
      //   name,
      //   email,
      //   password,
      // };

      // try {
      //   const config = {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   };
      //   const body = JSON.stringify(newUser);

      //   const res = await axios.post("/api/users", body, config); // can do "/api/users" because the proxy in package.json
      //   console.log(res.data);
      // } catch (err) {
      //   console.error(err.response.data);
      // }

      try {
        const response = await axios.post("api/users", {
          name,
          email,
          password,
        });
        dispatch(registerSuccess({ token: response.data.token }));
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => {
            const alertId = uuidv4();
            dispatch(
              setAlert({ id: alertId, msg: error.msg, alertType: "danger" })
            );
          });
        }

        dispatch(registerFail());
      }
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            // required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            // minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            // minLength='6'
            value={password2}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

// Register.propTypes = {};

export default Register;