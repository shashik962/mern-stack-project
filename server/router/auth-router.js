const express = require("express");
const { home, register, login, user } = require("../controllers/auth-controller");
const router = express.Router();
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middleware/validate-middleware");
const authMiddleware = require("../middleware/auth-middleware");

router.route("/").get(home);
router.route("/register").post(validate(signupSchema), register);
router.route("/login").post(validate(loginSchema), login);

// router.route("/register").get((req, res) => {
//     res.status(200).send("Welcome to my application by  router");
// });

router.route("/user").get(authMiddleware, user);

module.exports = router;

