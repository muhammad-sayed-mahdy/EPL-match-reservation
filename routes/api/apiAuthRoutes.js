const { Router } = require("express");
const authController = require("../../controllers/authController");
const { requireAuth } = require('../../middleware/auth');

const router = Router();

router.post('/signup', authController.verifySignup(), authController.signup_post);
router.post('/login', authController.verifyLogin(), authController.login_post);
router.get('/me', requireAuth, authController.me);

module.exports = router;