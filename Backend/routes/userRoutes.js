const express = require("express");
const {
  registerUser,
  authorizeUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authorizeUser);

module.exports = router;
