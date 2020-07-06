import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  GET_POST,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";
import axios from "axios";
import {setAlert} from "./alert";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({type: GET_POSTS, payload: res.data});
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

// get post

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({type: GET_POST, payload: res.data});
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

//Add likes

export const addLikes = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/comment/${postId}`);

    dispatch({type: UPDATE_LIKES, payload: {postId, likes: res.data}});
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

//remove likes

export const removeLikes = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({type: UPDATE_LIKES, payload: {postId, likes: res.data}});
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

//Add Comments

export const addComments = (postId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({type: ADD_COMMENT, payload: res.data});
    dispatch(setAlert("Comment Added", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

//Delete Comments

export const deleteComments = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({type: DELETE_COMMENT, payload: commentId});
    dispatch(setAlert("Comment Removed", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

// delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);

    dispatch({type: DELETE_POST, payload: postId});
    dispatch(setAlert("Post Removed", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};

// ADD post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/posts", formData, config);

    dispatch({type: ADD_POST, payload: res.data});
    dispatch(setAlert("Post Added", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status},
    });
  }
};
