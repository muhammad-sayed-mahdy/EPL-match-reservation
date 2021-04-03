const { Router } = require("express");
const stadController = require("../../controllers/stadiumController");

const router = Router();

router.post('/', stadController.verifyStore(), stadController.store);
router.put('/', stadController.verifyUpdate(), stadController.update);
router.delete('/', stadController.verifyDestroy(), stadController.destroy);

module.exports = router;