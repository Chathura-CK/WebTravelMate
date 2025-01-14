const Booking = require('../models/bookings');
const Package = require('../models/package');

const ErrorHandler = require('../util/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const bookings = require('../models/bookings');

// create a new Booking
exports.newBooking = catchAsyncErrors(async (req,res,next) =>{
    const{
        bookingItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    
    const booking = await Booking.create({
        bookingItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        booking
    })
})

exports.getSingleBooking = catchAsyncErrors(async (req, res, next) => {

    const booking = await Booking.findById(req.params.id).populate('user', 'name','eemail');

    if(!booking){
        return next(new ErrorHandler('No order found withthis id', 404))
    }

    res.status(200).json({
        success: true,
        booking
    })
})



exports.myBookings = catchAsyncErrors(async (req, res, next) => {

    const bookings = await Booking.find({user:req.user.id});


    res.status(200).json({
        success: true,
        bookings
    })
})

exports.allBookings = catchAsyncErrors(async (req,res ,next) => {

    const bookings = await Booking.find({user:req.user.id});

    let totalAmount = 0;
    bookings.forEach(booking =>{
        totalAmount += booking.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        bookings
    })

})


exports.updateBooking = catchAsyncErrors(async (req,res ,next) => {

    const booking = await Booking.findById(req.params.id);


   if(bookingBy.bookingStatus === 'Delivered'){
        return next(new ErrorHandler('You have already delivered this booking', 404));

   }

   booking.bookingItem.forEach(async items => {
        await updateStock(items.package, item.quantity)
   })

   booking.bookingStatus = req.body.status,
   booking.deleveredAt = Date.now()

   await booking.save();

    res.status(200).json({
        success: true,
        
    })

})

async function updateStock(id, quantity){
    const package = await Package.findById(id);

    package.stock = package.stock - quantity;

    await package.save({ validateBeforeSave: false });

}

// delete booking

exports.deleteBooking = catchAsyncErrors(async  (req, res, next) => {
    
    const booking = await Package.findById(req.params.id);

    if(!booking){
        return next(new ErrorHandler('Booking not found', 404))
    }

    await booking.deleteOne();

    res.status(200).json({
        success: true,
       
    })
})