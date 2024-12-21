const express = require('express');
const router = express.Router();

const {
    getPackages, 
    newPackage, 
    getSinglePackage, 
    updatePackage ,
    deletePackage
} = require('../controllers/packageController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/packages').get(getPackages);
router.route('/packages/:id').get(getSinglePackage);
router.route('/admin/packages/new').post(isAuthenticatedUser, newPackage);
router.route('/admin/packages/:id')
                                .put(isAuthenticatedUser,authorizeRoles('admin'),updatePackage)
                                .delete(isAuthenticatedUser,authorizeRoles('admin'),deletePackage);  




module.exports = router;