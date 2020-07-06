import React, {Fragment, useState} from "react";
import {Link,Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {register} from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({setAlert, register,isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const {name, email, password, password2} = formData;

  function handleChange(event) {
    const {name, value} = event.target;

    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger", 3000);
    } else {
      register({name, email, password});
    }
  }

  if(isAuthenticated) {
    return <Redirect to='/dashboard'/>
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
};

const mapStateToProps= state =>( {
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Register);
