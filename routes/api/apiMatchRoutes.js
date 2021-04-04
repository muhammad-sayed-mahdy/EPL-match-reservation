const { Router } = require("express");
const matchController = require("../../controllers/matchController");
// const { requireAuth } = require('../../middleware/auth');

const router = Router();


router.get('/home',matchController.show_home);

module.exports = router;