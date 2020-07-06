import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: {current, school, degree, fieldofstudy, from, to, description},
}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        {" "}
        {<Moment format="DD/MM/YYYY">{from}</Moment>} -
        {current ? (
          <span>- Current</span>
        ) : (
          <span>{<Moment format="DD/MM/YYYY">{to}</Moment>}</span>
        )}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy && <span>{fieldofstudy}</span>}
      </p>
      <p>
        <strong>Description: </strong>
        {description && <span>{description}</span>}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
