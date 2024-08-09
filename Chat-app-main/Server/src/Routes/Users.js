import express from "express";
import login from "../../Auth/Login.js"
import signup from "../../Auth/Signup.js"
import verify_token from "../../Auth/Verify_token.js"

const router = express.Router();

router.post('/login', login);
router.post('/signin', signup);
router.post('/verifyToken', verify_token);

export default router;
