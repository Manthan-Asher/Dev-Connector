import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProfileByUserId} from "../../actions/profile";
import Spinner from "../layout/Spinner.js";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import ProfileAbout from "./ProfileAbout";
import ProfileEducation from "./ProfileEducation";
import ProfileExperience from "./ProfileExperience";
import ProfileGithub from "./ProfileGithub";
import ProfileTop from "./ProfileTop";

const Profile = ({
  match,
  getProfileByUserId,
  profile: {profile, loading},
  auth,
}) => {
  useEffect(() => {
    getProfileByUserId(match.params.id);
  }, [getProfileByUserId, match.params.id]);

  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div class="profile-exp bg-white p-2">
              <h2 class="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((experience) => {
                    return (
                      <ProfileExperience
                        experience={experience}
                        key={experience._id}
                      />
                    );
                  })}
                </>
              ) : (
                <h4>No experience found</h4>
              )}
            </div>
            <div class="profile-edu bg-white p-2">
              <h2 class="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((education) => {
                    return (
                      <ProfileEducation
                        education={education}
                        key={education._id}
                      />
                    );
                  })}
                </>
              ) : (
                <h4>No education found</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileByUserId: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {getProfileByUserId})(Profile);
