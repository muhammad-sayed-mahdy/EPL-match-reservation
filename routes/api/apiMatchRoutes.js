const { Router } = require("express");
const matchController = require("../../controllers/matchController");
const { requireAuth } = require("../../middleware/auth");
const { authorizeManager } = require("../../middleware/authorize");

const router = Router();


router.get('/',matchController.show_home);

router.get('/matches/show_all',matchController.show_matches);

router.get('/matches/create', matchController.add_event);
router.get('/matches/:id', matchController.show_match);


router.post('/matches/add_match', requireAuth, authorizeManager, matchController.add_match);

router.delete('/matches/:id',requireAuth, authorizeManager, matchController.delete_match);

router.get('/matches/update/:id', requireAuth, authorizeManager, matchController.redirect_update);

router.post('/matches/update_match/:id',requireAuth, authorizeManager, matchController.update_match);

module.exports = router;