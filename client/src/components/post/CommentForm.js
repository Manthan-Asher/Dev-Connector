import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {useState} from "react";
import {addComments} from "../../actions/post";

const CommentForm = ({addComments, postId}) => {
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComments(postId, {text});
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComments: PropTypes.func.isRequired,
};

export default connect(null, {addComments})(CommentForm);
