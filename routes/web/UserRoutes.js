const { Router } = require("express");
const userController = require("../../controllers/UserController");
const { userRoute } = require('../../middleware/auth');

const router = Router();
// /user/
router.get('/update_profile', userRoute, userController.edit);
router.get('/profile', userRoute, userController.view_profile);
router.get('/reservations', userRoute, userController.reservations);
router.get('/:id', userController.view);

module.exports = router;