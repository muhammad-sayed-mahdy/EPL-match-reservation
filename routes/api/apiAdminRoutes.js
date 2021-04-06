const { Router } = require("express");
const adminController = require("../../controllers/adminController");
const { requireAuth } = require("../../middleware/auth");
const { authorizeAdmin } = require("../../middleware/authorize");
const router = Router();

// for dev:
router.get('/:id', adminController.show_user);

// router.get('/', requireAuth, authorizeAdmin, adminController.getAllUsers);
router.get('/', adminController.getAllUsers);

// router.delete('/', requireAuth, authorizeAdmin, adminController.verify_id(), adminController.deleteUser);
router.delete('/:id',adminController.delete_user_2); //works.
//router.put('/', requireAuth, authorizeAdmin, adminController.verify_id(), adminController.approveUser);

router.post('/authorize/:id', adminController.approveUser);


router.post('/', requireAuth, authorizeAdmin, adminController.verifySearch(), adminController.searchUsers);

module.exports = router;