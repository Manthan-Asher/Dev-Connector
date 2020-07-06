import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: {company, title, from, to, description, current},
}) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        {<Moment format="DD/MM/YYYY">{from}</Moment>}{" "}
        {current ? (
          <span>- Current</span>
        ) : (
          <span>{<Moment format="DD/MM/YYYY">{to}</Moment>}</span>
        )}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description && <span>{description}</span>}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
