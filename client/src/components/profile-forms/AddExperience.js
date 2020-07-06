import React, {useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {addExperience} from "../../actions/profile";

const AddExperience = ({addExperience, history}) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const {title, company, location, from, to, current, description} = formData;

  const [setCurrent, toggleCurrent] = useState(false);

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };
  return (
    <>
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <input
            value={title}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* Job Title"
            name="title"
            required
          />
        </div>
        <div class="form-group">
          <input
            value={company}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="* Company"
            name="company"
            required
          />
        </div>
        <div class="form-group">
          <input
            value={location}
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Location"
            name="location"
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
              type="checkbox"
              name="current"
              onChange={(e) => {
                setFormData({...formData, current: !current});
                toggleCurrent(!setCurrent);
              }}
            />{" "}
            Current Job
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
            placeholder="Job Description"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, {addExperience})(withRouter(AddExperience));
