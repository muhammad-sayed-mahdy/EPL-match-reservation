const { Router } = require("express");
const userController = require("../../controllers/UserController");
const { userRoute } = require('../../middleware/auth');

const router = Router();

router.get('/:id', userController.view);

module.exports = router;