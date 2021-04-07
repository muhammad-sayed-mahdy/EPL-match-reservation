const { Router } = require("express");
const adminController = require("../../controllers/adminController");
const { requireAuth } = require("../../middleware/auth");
const { authorizeAdmin } = require("../../middleware/authorize");
const router = Router();

//api/admin/
router.get('/', requireAuth, authorizeAdmin, adminController.getAllUsers);
router.get('/:id',  requireAuth, authorizeAdmin, adminController.show_user);

router.delete('/:id', requireAuth, authorizeAdmin, adminController.verify_id(), adminController.delete_user_2);

router.patch('/authorize/:id', requireAuth, authorizeAdmin, adminController.verify_id(), adminController.approveUser);

router.post('/', requireAuth, authorizeAdmin, adminController.verifySearch(), adminController.searchUsers);

module.exports = router; 