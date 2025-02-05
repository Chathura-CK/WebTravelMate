const MagazinePost = require('../models/magazine');
const ErrorHandler = require('../util/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../util/jwtToken');


exports.submitPost = catchAsyncErrors(async (req, res, next) => {
    const { title, image, description } = req.body;
    const newPost = new MagazinePost({
        title,
        image,
        description,
        submittedBy: req.user.id,
    });
    await newPost.save();
    res.status(201).send(newPost);
});

exports.getPendingPosts = catchAsyncErrors(async (req, res, next) => {
    const pendingPosts = await MagazinePost.find({ status: 'pending' });
    res.status(200).json({
        success: true,
        pendingPosts
    });
});

exports.putApprovePosts = catchAsyncErrors(async  (req, res, next) => {
    
      const post = await MagazinePost.findById(req.params.id);
            if (!post) return res.status(404).send('Post not found');
            post.status = 'approved';
            post.approvedBy = req.user.id;
            await post.save();
            res.send(post);
});

exports.getApprovedPosts = catchAsyncErrors(async  (req, res, next) => {
    
   const approvedPosts = await MagazinePost.find({ status: 'approved' });
       res.send(approvedPosts);
});
    