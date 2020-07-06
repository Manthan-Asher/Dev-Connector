import React from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import {connect} from "react-redux";
import {getPost} from "../../actions/post";
import {useEffect} from "react";
import PostItem from "../posts/PostItem";
import {Link} from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({post: {post, loading}, getPost, match}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/posts" className="btn">
        Back to Posts
      </Link>
      <PostItem showActions={false} post={post} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} postId={post._id} comment={comment} />
        ))}
      </div>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getPost})(Post);
