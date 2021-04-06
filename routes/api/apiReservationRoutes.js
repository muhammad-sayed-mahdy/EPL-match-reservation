const { Router } = require("express");
const reserveController = require("../../controllers/reserveController");
const { requireAuth } = require("../../middleware/auth");

const router = Router();

router.post('/', requireAuth, reserveController.verifyReserve(), reserveController.reserve_post);
router.put('/cancel', requireAuth, reserveController.verifyCancelReserve(), reserveController.cancelReserve_put);
router.get('/show', requireAuth, reserveController.showReserve_get);

module.exports = router;