const { Router } = require("express");
const teamController = require("../../controllers/teamController");

const router = Router();

router.post('/', teamController.verifyStore(), teamController.store);
router.delete('/', teamController.verifyDestroy(), teamController.destroy);

module.exports = router;