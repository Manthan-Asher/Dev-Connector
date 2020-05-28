const express = require("express");
const router = express.Router();
const Profile = require("../../model/Profile");
const User = require("../../model/User");
const Auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");

// @route  GET api/profile/me
// @desc   get current user's profile
// @access  private

router.get("/me", Auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id}).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res
        .status(400)
        .json({msg: "There is no profile attached to this user"});
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/profile
// @desc   create users profile
// @access  private

router.post(
  "/",
  [
    Auth,
    // status is required
    check("status", "status is required").notEmpty(),
    // skills are required
    check("skills", "skills are required").notEmpty(),
  ],
  async (req, res) => {
    // Find validation errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    // Build profile fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    //  Build profile social fields
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({user: req.user.id});

      if (profile) {
        // update
        profile = await Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true}
        );
        return res.json(profile);
      }
      // Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  GET api/profile
// @desc   get all profiles
// @access  public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route  GET api/profile/user/:user_id
// @desc   get profile by user id
// @access  public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({msg: "Profile not found"});
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({msg: "Profile not found"});
    }
    res.status(500).send("Server error");
  }
});

// @route  DELETE api/profile
// @desc   delete profile,user and post
// @access  private

router.delete("/", Auth, async (req, res) => {
  try {
    // Delete profile
    await Profile.findOneAndRemove({user: req.user.id});

    // Delete user
    await User.findOneAndRemove({_id: req.user.id});

    res.json({msg: "User deleted"});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route  PUT api/profile/experience
// @desc    add experience
// @access  private

router.put(
  "/experience",
  [
    Auth,
    [
      // Check if title is present
      check("title", "title is required").notEmpty(),
      // Check if company is present
      check("company", "company is required").notEmpty(),
      // Check if from date is present
      check("from", "from date is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    // Find validation errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {title, company, location, from, to, current, description} = req.body;

    const newExp = {title, company, location, from, to, current, description};
    try {
      // update profile
      const profile = await Profile.findOne({user: req.user.id});
      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  DELETE api/profile/experience/:exp_id
// @desc   delete experience
// @access  private

router.delete("/experience/:exp_id", Auth, async (req, res) => {
  try {
    // Delete experience
    const profile = await Profile.findOne({user: req.user.id});

    // Get remove index
    const removeIndex = profile.experience.filter(
      (item) => item.id !== req.params.exp_id
    );

    profile.experience = removeIndex;
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route  PUT api/profile/education
// @desc    add education
// @access  private

router.put(
  "/education",
  [
    Auth,
    [
      // Check if school is present
      check("school", "school is required").notEmpty(),
      // Check if degree is present
      check("degree", "degree  is required").notEmpty(),
      // Check if from date is present
      check("from", "from date is required").notEmpty(),
      // Check if field of study is present
      check("fieldofstudy", "field of study is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    // Find validation errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      // update profile
      const profile = await Profile.findOne({user: req.user.id});
      profile.education.push(newEdu);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  DELETE api/profile/education/:edu_id
// @desc   delete education
// @access  private

router.delete("/education/:edu_id", Auth, async (req, res) => {
  try {
    // Delete education
    const profile = await Profile.findOne({user: req.user.id});

    // Get remove index
    const removeIndex = profile.education.filter(
      (item) => item.id !== req.params.edu_id
    );

    profile.education = removeIndex;
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
