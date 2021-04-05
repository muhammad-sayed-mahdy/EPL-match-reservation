const { Router } = require("express");
const matchController = require("../../controllers/matchController");
// const { requireAuth } = require('../../middleware/auth');

const router = Router();


router.get('/home',matchController.show_home);
router.get('/home/show_all',matchController.show_matches);
router.get('/home/add-match',matchController.add_match);

module.exports = router;