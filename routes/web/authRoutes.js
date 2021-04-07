const { Router } = require("express");
const authController = require("../../controllers/authController");
const reserveController = require("../../controllers/reserveController");
const { guestRoute, requireAuth } = require('../../middleware/auth');

const router = Router();

router.get('/signup', guestRoute, authController.signup_get);
router.get('/login', guestRoute, authController.login_get);
router.post('/logout', authController.logout);
router.get('/reservation/:match_id', requireAuth, reserveController.getReservations);

module.exports = router;