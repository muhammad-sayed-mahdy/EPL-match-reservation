const { Router } = require("express");
const userController = require("../../controllers/UserController");
const { requireAuth } = require('../../middleware/auth');

const router = Router();

router.post('/update', requireAuth, userController.verifyUpdate(), userController.update);

//Evram:
//Before redirecting, you need to check the type of the user first
//I'm assuming it's a manager for now
router.get('/profile', userController.view_manager_profile);

module.exports = router;