const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    shippingInfo:{
        address:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        phoneNo:{
            type: String,
            required: true
        },
        postalCode:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    bookingItem:[
        {
            name:{
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            image:{
                type: String,
                required: true
            },
            price:{
                type: Number,
                required: true
            },
            package:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref:'Product'
            }    
        }
    ],
    paymentInfo:{
        id:{
            type:String,
        },
        status:{
            type:String,
        }
    },
    paidAt:{
        type:Date,
    },
    itemPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    bookingStatus:{
        type:String,
        required: true,
        default: 'Processing'
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Booking',bookingSchema);