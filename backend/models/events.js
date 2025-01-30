const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide event'] ,
        trim: true,
        maxLength:[100, 'event name can not exceed 100 characters']
    },
    date: {
        type: Date,
        required: [true, 'Please provide event date'] 
    },
    description: {
        type: String,
        required: [true, 'Please provide event description'] ,
        trim: true,
        maxLength:[100, 'event name can not exceed 100 characters']
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

module.exports = mongoose.model('Events', eventSchema);