import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getPosts} from "../../actions/post";
import {useEffect} from "react";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({post: {posts, loading}, getPosts}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 class="large text-primary">Posts</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome to the community!
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {post: state.post};
};

export default connect(mapStateToProps, {getPosts})(Posts);
