import axios from "axios";
import {setAlert} from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "./types";

// get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

// get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({type: CLEAR_PROFILE});
  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

// get profile by userId
export const getProfileByUserId = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

// get github repos
export const getRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

// add education

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education added", "success"));

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

// add Experience

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience added", "success"));

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

// delete experience

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({type: UPDATE_PROFILE, payload: res.data});

    dispatch(setAlert("Experience deleted", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

// delete education

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({type: UPDATE_PROFILE, payload: res.data});

    dispatch(setAlert("Education deleted", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

// delete account and profile

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure ? This cannot be undone!")) {
    try {
      await axios.delete(`/api/profile/`);

      dispatch({type: CLEAR_PROFILE});
      dispatch({type: DELETE_ACCOUNT});

      dispatch(setAlert("Your account has been deleted", "danger"));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
