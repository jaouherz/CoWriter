const express = require("express");
const AuthController = require("../controllers/authController");
const { OAuth2Client } = require('google-auth-library');


const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post('/google-auth', AuthController.googleAuth);
module.exports = router;