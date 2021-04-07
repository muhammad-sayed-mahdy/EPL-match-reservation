const { Router } = require("express");
const userController = require("../../controllers/UserController");
const { userRoute } = require('../../middleware/auth');

const router = Router();

router.get('/update_profile', userRoute, userController.edit);
router.get('/profile', userRoute, userController.view_profile);
router.get('/:id', userController.view);

module.exports = router;