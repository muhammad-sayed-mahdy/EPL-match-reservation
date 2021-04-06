const { Router } = require("express");
const userController = require("../../controllers/UserController");
const { requireAuth } = require('../../middleware/auth');

const router = Router();

router.put('/update_profile', requireAuth, userController.verifyUpdate(), userController.update);


module.exports = router;