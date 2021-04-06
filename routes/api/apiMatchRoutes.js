const { Router } = require("express");
const matchController = require("../../controllers/matchController");
// const { requireAuth } = require('../../middleware/auth');

const router = Router();


router.get('/',matchController.show_home);
router.get('/matches/show_all',matchController.show_matches);
router.post('/matches/add_match',matchController.add_match);
router.get('/matches/:id',matchController.show_match);
router.delete('/matches/:id',matchController.delete_match);
router.get('/matches/update/:id', matchController.redirect_update);
router.post('/matches/update_match/:id', matchController.update_match);
module.exports = router;