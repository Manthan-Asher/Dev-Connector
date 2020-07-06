import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteComments} from "../../actions/post";
import {Link} from "react-router-dom";
import Moment from "react-moment";

const CommentItem = ({
  postId,
  auth,
  comment: {name, _id, avatar, text, user, date},
  deleteComments,
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
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>{" "}
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => deleteComments(postId, _id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  deleteComments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {deleteComments})(CommentItem);
