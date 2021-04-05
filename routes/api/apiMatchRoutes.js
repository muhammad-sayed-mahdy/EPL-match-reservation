const { Router } = require("express");
const matchController = require("../../controllers/matchController");
// const { requireAuth } = require('../../middleware/auth');

const router = Router();


router.get('/',matchController.show_home);
router.get('/show_all',matchController.show_matches);
router.get('/add_match',matchController.add_match);

module.exports = router;