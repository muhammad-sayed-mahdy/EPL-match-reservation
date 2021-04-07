const { Router } = require("express");
const adminController = require("../../controllers/adminController");
const { requireAuth,userRoute } = require("../../middleware/auth");
const { authorizeAdmin,renderUnauthorized } = require("../../middleware/authorize");
const router = Router();

router.get('/', userRoute, renderUnauthorized, adminController.getAllUsers);
router.get('/:id',  userRoute, renderUnauthorized, adminController.show_user);

router.delete('/:id', requireAuth, authorizeAdmin, adminController.verify_id(), adminController.delete_user_2);
router.patch('/authorize/:id', requireAuth, authorizeAdmin, adminController.verify_id(), adminController.approveUser);
router.patch('/promote/:id', requireAuth, authorizeAdmin, adminController.verify_id(), adminController.promoteUser);

router.post('/', userRoute, renderUnauthorized, adminController.verifySearch(), adminController.searchUsers);

module.exports = router; 