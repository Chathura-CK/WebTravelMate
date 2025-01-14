const express = require('express');
const router = express.Router();


const {
    newBooking,
    getSingleBooking,
    myBookings,
    allBookings,
    updateBooking,
    deleteBooking
} = require('../controllers/bookingController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/booking/new').post(isAuthenticatedUser, newBooking);
router.route('/booking/:id').get(isAuthenticatedUser, getSingleBooking);
router.route('/bookings/me').get(isAuthenticatedUser, myBookings);

router.route('/admin/bookings/').get(isAuthenticatedUser,authorizeRoles('admin'), allBookings);
router.route('/admin/booking/:id')
                .put(isAuthenticatedUser,authorizeRoles('admin'), updateBooking)
                .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteBooking);



module.exports = router;