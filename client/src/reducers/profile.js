import {
  PROFILE_ERROR,
  GET_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_REPOS,
  GET_PROFILES,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  repos: [],
  error: {},
};
function profile(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        repos: [],
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}

export default profile;
