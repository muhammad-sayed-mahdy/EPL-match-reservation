const { Router } = require("express");
const authController = require("../controllers/authController");
const { guestRoute } = require('../middleware/auth');

const router = Router();

router.get('/signup', guestRoute, authController.signup_get);
router.get('/login', guestRoute, authController.login_get);
router.post('/logout', authController.logout);

module.exports = router;