const express = require("express");
const router = express.Router();
const Auth = require("../../middleware/auth");
const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");
const md5 = require("md5");

// @route  GET api/auth
// @desc   Get user by token
// @access  private

router.get("/", Auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/auth
// @desc   Login User
// @access  public

router.post(
  "/",
  [
    // email is required
    check("email", "Please enter a valid email").isEmail(),
    // Password must exist
    check("password", "Please enter a password").exists(),
  ],
  async (req, res) => {
    // Find validation errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    // See if user exists
    try {
      let user = await User.findOne({email});

      if (!user) {
        return res.status(400).json({errors: [{msg: "Invalid credentials"}]});
      }

      const hashedPassword = md5(password);

      if (hashedPassword !== user.password) {
        return res.status(400).json({errors: [{msg: "Invalid credentials"}]});
      }

      // uses jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send({msg: "Server error"});
    }
  }
);

module.exports = router;
