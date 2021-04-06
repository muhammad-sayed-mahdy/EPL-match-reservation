const { Router } = require("express");
const adminController = require("../../controllers/adminController");
const { requireAuth } = require("../../middleware/auth");
const { authorizeAdmin } = require("../../middleware/authorize");
const router = Router();

// for dev:
router.get('/:id',  requireAuth, authorizeAdmin, adminController.show_user);

router.get('/', requireAuth, authorizeAdmin, adminController.getAllUsers);

//sorry kareem, but delete_user_2 works!
router.delete('/', requireAuth, authorizeAdmin, adminController.verify_id(), adminController.delete_user_2);

router.post('/', requireAuth, authorizeAdmin, adminController.verify_id(), adminController.approveUser);

router.post('/', requireAuth, authorizeAdmin, adminController.verifySearch(), adminController.searchUsers);

module.exports = router;