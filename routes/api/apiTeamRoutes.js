const { Router } = require("express");
const stadController = require("../../controllers/teamController");

const router = Router();

router.post('/addteam', stadController.verifyAddTeam(), stadController.addTeam_post);
router.delete('/dltteam', stadController.verifyDltTeam(), stadController.dltTeam_delete);

module.exports = router;