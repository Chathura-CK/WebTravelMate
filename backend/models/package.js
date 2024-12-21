const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide package'] ,
        trim: true,
        maxLength:[100, 'package name can not exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide package price'] ,
        maxLength:[5, 'package name can not exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please provide package'] ,
        trim: true,
        maxLength:[100, 'package name can not exceed 100 characters']
    }, 
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required: [true, 'Please select category'],
        enum:{
            values: [
                'Hiking',
                'Rowing',
                'Camping',
            ],
            message: 'Please select correct category'    
        }
    },
    guide:{
        type:String,
        required:[true,'Please enter packge guide']
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews: [
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,

            },
            comment:{
                type:String,
                required:true
            }

        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('Package', packageSchema);