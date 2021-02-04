const { Router } = require("express");
const reserveController = require("../../controllers/reserveController");

const router = Router();

router.post('/reserve', reserveController.verifyReserve(), reserveController.reserve_post);
router.put('/cancelreserve', reserveController.verifyCancelReserve(), reserveController.cancelReserve_put);

module.exports = router;