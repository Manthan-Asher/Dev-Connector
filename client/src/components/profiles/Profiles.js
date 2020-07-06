import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAllProfiles} from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = ({getAllProfiles, profile: {profiles, loading}}) => {
  useEffect(() => getAllProfiles(), [getAllProfiles]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>
            Browse and Connect with Developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => {
                return <ProfileItem key={profile._id} profile={profile} />;
              })
            ) : (
              <h3>No profiles found</h3>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {profile: state.profile};
};

export default connect(mapStateToProps, {getAllProfiles})(Profiles);
