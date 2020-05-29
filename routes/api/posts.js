const express = require("express");
const router = express.Router();
const Profile = require("../../model/Profile");
const User = require("../../model/User");
const Post = require("../../model/Posts");
const Auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");

// @route  POST api/posts
// @desc    Create a post
// @access  private

router.post(
  "/",
  [
    Auth,
    [
      // Check if text is present
      check("text", "Text is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    // Find validation errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const post = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      await post.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  GET api/posts
// @desc   get all posts
// @access  private

router.get("/", Auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({date: -1});
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route  GET api/posts/:id
// @desc   get post by id
// @access  private

router.get("/:id", Auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({msg: "No post found"});
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({msg: "No post found"});
    }
    res.status(500).send("Server error");
  }
});

// @route  DELETE api/posts/:id
// @desc   delete post by id
// @access  private

router.delete("/:id", Auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({msg: "No post found"});
    }

    //   Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({msg: "User not authorized"});
    }

    await post.remove();
    res.json({msg: "Post removed"});
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({msg: "No post found"});
    }
    res.status(500).send("Server error");
  }
});

// @route  POST api/posts/like/:id
// @desc   like post
// @access  private

router.post("/like/:id", Auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post has been already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({msg: "Post has been liked already"});
    }

    post.likes.unshift({user: req.user.id});

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route  POST api/posts/unlike/:id
// @desc   unlike post
// @access  private

router.post("/unlike/:id", Auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post is not liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({msg: "Post has not yet been liked"});
    }

    // Get remove index
    const removeIndex = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );

    post.likes = removeIndex;

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route  POST api/posts/comment/:id
// @desc    make a comment
// @access  private

router.post(
  "/comment/:id",
  [
    Auth,
    [
      // Check if text is present
      check("text", "Text is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    // Find validation errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.push(newComment);
      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   delete comment
// @access  private

router.delete("/comment/:id/:comment_id", Auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //   Pull out comment

    const comment = post.comments.filter(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({msg: "comment does not exist"});
    }

    //   Check user
    if (comment[0].user.toString() !== req.user.id) {
      return res.status(401).json({msg: "User not authorized"});
    }

    // Get remove index
    const removeIndex = post.comments.filter(
      (comment) => comment.user.toString() !== req.user.id
    );

    post.comments = removeIndex;

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
