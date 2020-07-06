import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {addLikes, removeLikes, deletePost} from "../../actions/post";
import Moment from "react-moment";

const PostItem = ({
  auth,
  post: {_id, avatar, name, likes, comments, text, user, date},
  addLikes,
  removeLikes,
  deletePost,
  showActions,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {showActions && (
          <>
            <button
              onClick={(e) => addLikes(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up"></i>{" "}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={(e) => removeLikes(_id)}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => deletePost(_id)}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeLikes: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {addLikes, removeLikes, deletePost})(
  PostItem
);
