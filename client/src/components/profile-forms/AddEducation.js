import React, {useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {addEducation} from "../../actions/profile";

const AddEducation = ({addEducation, history}) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const [setCurrent, toggleCurrent] = useState(false);

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };
  return (
    <>
      <h1 class="large text-primary">Add Your Education</h1>
      <p class="lead">
        <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <input
            value={school}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
          />
        </div>
        <div class="form-group">
          <input
            value={degree}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
          />
        </div>
        <div class="form-group">
          <input
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input
            value={from}
            onChange={(e) => onChange(e)}
            type="date"
            name="from"
          />
        </div>
        <div class="form-group">
          <p>
            <input
              value={current}
              onChange={(e) => {
                setFormData({...formData, current: !current});
                toggleCurrent(!setCurrent);
              }}
              type="checkbox"
              name="current"
            />{" "}
            Current School or Bootcamp
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input
            value={to}
            onChange={(e) => onChange(e)}
            type="date"
            name="to"
            disabled={setCurrent ? "disabled" : ""}
          />
        </div>
        <div class="form-group">
          <textarea
            value={description}
            onChange={(e) => onChange(e)}
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, {addEducation})(withRouter(AddEducation));
