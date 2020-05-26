const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const {check, validationResult} = require("express-validator");
const User = require("../../model/User");
const md5 = require("md5");
const config = require("config");
const jwt = require("jsonwebtoken");

// @route  POST api/users
// @desc   Register User
// @access  public

router.post(
  "/",
  [
    // name is required
    check("name", "Name is required").notEmpty(),
    // email is required
    check("email", "Please enter a valid email").isEmail(),
    // Password must be min 6 chars
    check("password", "Password must be min 6 characters long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Find validation errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    // See if user exists
    try {
      let user = await User.findOne({email});

      if (user) {
        return res.status(400).json({errors: [{msg: "User already exists"}]});
      }

      const avatar = gravatar.url(email, {
        s: "200",
        d: "mm",
        r: "pg",
      });

      user = new User({name, email, password: md5(password), avatar});

      await user.save();

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
