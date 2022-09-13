const router = require("express").Router();
const Category = require("../models/Category.js");
const Categoty = require("../models/Category.js");

router.post("/create", async (req, res) => {
  const newCat = new Categoty(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/get", async (req, res) => {
  try {
    const Cats = await Category.find();
    res.status(200).json(Cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
