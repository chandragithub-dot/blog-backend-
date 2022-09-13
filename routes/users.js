const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const Post = require("../models/Post.js");

//update
router.put("/update/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("You can update only your account");
  }
});

//delete

router.delete("/delete/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (req.body.id === user.id) {
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(user.id);

        res.status(200).json("User is deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json("You can delete only your account!");
    }
  } else {
    res.status(401).json("User no found");
  }
});

//Get User

router.get("/get/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
