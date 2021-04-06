const { Router } = require("express");
const adminController = require("../../controllers/adminController");
const { requireAuth } = require("../../middleware/auth");
const { authorizeAdmin } = require("../../middleware/authorize");
const router = Router();


// router.get('/', requireAuth, authorizeAdmin, adminController.getAllUsers);
// for dev:
router.get('/', adminController.getAllUsers);

router.post('/', requireAuth, authorizeAdmin, adminController.verifySearch(), adminController.searchUsers);
router.delete('/', requireAuth, authorizeAdmin, adminController.verify_id(), adminController.deleteUser);
router.put('/', requireAuth, authorizeAdmin, adminController.verify_id(), adminController.approveUser);

module.exports = router;