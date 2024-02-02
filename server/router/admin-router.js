const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middleware/auth-middleware");
const router = express.Router();

// router.route('/users').get(authMiddleware, adminMidlleware, adminController.getAllUsers);
// router.route('/users/delete/:id').delete(authMiddleware, adminMidlleware, adminController.getAllContacts);
// router.route('/contacts').get(authMiddleware, adminMidlleware, adminController.getAllContacts);

router.route('/users').get(adminController.getAllUsers);
router.route('/users/:id').get(adminController.getUserById);
router.route('/users/update/:id').patch(adminController.updatetUserById);
router.route('/users/delete/:id').delete(adminController.deleteUserById);
router.route('/contacts').get(adminController.getAllContacts);
router.route('/contacts/delete/:id').delete(adminController.deleteContactById);

module.exports = router;