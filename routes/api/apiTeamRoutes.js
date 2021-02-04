const { Router } = require("express");
const teamController = require("../../controllers/teamController");

const router = Router();

router.post('/:id', teamController.verifyStore(), teamController.store);
router.delete('/:id', teamController.verifyDestroy(), teamController.destroy);

module.exports = router;