const mongoose = require('mongoose');

const magazinePostSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
 },
  image: {
     type: String, 
     required: true 
    },
  description: { 
    type: String, 
    required: true
 },
  status: { 
    type: String, 
    enum: ['pending', 'approved'], 
    default: 'pending'
 },
  submittedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
 },
  approvedBy: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User' 
    },
}, { 
    timestamps: true 
});

module.exports = mongoose.model('MagazinePost', magazinePostSchema);