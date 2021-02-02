const { Router } = require("express");
const stadController = require("../../controllers/stadiumController");

const router = Router();

router.post('/addstad', stadController.verifyAddStadium(), stadController.addStad_post);
router.put('/updstad', stadController.verifyUpdStadium(), stadController.updStad_put);
router.delete('/dltstad', stadController.verifyDltStadium(), stadController.dltStad_delete);

module.exports = router;