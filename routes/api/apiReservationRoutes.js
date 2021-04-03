const { Router } = require("express");
const reserveController = require("../../controllers/reserveController");

const router = Router();

router.post('/', reserveController.verifyReserve(), reserveController.reserve_post);
router.put('/cancel', reserveController.verifyCancelReserve(), reserveController.cancelReserve_put);

module.exports = router;