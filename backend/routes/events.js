const express = require('express');
const router = express.Router();

const {
    getEvents, 
    newEvent, 
    getSingleEvent, 
    updateEvent ,
    deleteEvent
} = require('../controllers/eventsController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/events').get(getEvents);
router.route('/events/:id').get(getSingleEvent);
router.route('/admin/events/new').post(isAuthenticatedUser, newEvent);
router.route('/admin/events/:id')
                                .put(isAuthenticatedUser,authorizeRoles('admin'),updateEvent)
                                .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteEvent);  




module.exports = router;