const { Router } = require("express");
const reserveController = require("../../controllers/reserveController");
const { requireAuth } = require("../../middleware/auth");

const router = Router();

router.post('/', requireAuth, reserveController.verifyReserve(), reserveController.reserve_post);
router.put('/cancel', requireAuth, reserveController.verifyCancelReserve(), reserveController.cancelReserve_put);
router.get('/show', requireAuth, reserveController.showReserve_get);        // get reserved seat of a certain match
router.get('/reserved', requireAuth, reserveController.getReservedseats);   // get reserved seats for a certain user for all matches

module.exports = router;