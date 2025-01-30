const Event = require('../models/events');
const ErrorHandler = require('../util/errorHandler');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const APIFeatures = require('../util/apiFeatures');



exports.newEvent = catchAsyncErrors(async (req,res,next) =>{
    
    req.body.user = req.user.id;
    
    const event = await Event.create(req.body);

    res.status(201).json({
        success: true,
        event
    })
})

exports.getEvents = catchAsyncErrors(async (req,res ,next) => {

    const resPerPage = 4;
    const eventCount = await Event.countDocuments();
    
    const apiFeatures = new APIFeatures(Event.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)

    const events = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: events.length,
        events  
    })

})

exports.getSingleEvent = catchAsyncErrors(async (req, res, next) => {

    const event = await Event.findById(req.params.id);

    if(!event){
        return next(new ErrorHandler('Event not found', 404))
    }

    res.status(200).json({
        success: true,
        event
    })
})

// update event

exports.updateEvent = catchAsyncErrors(async  (req, res, next) => {
    
    let event = await Event.findById(req.params.id);

    if(!event){
        return next(new ErrorHandler('Event not found', 404))
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify:false
    });

    res.status(200).json({
        success: true,
        event
    })
})

// delete event

exports.deleteEvent = catchAsyncErrors(async  (req, res, next) => {
    
    const event = await Event.findById(req.params.id);

    if(!event){
        return next(new ErrorHandler('Event not found', 404))
    }

    await event.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Event removed successfully'
    })
})
    
    
