const Package = require('../models/package');
const ErrorHandler = require('../util/errorHandler');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const APIFeatures = require('../util/apiFeatures');



exports.newPackage = catchAsyncErrors(async (req,res,next) =>{
    
    req.body.user = req.user.id;
    
    const package = await Package.create(req.body);

    res.status(201).json({
        success: true,
        package
    })
})

exports.getPackages = catchAsyncErrors(async (req,res ,next) => {

    const resPerPage = 4;
    const packageCount = await Package.countDocuments();
    
    const apiFeatures = new APIFeatures(Package.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)

    const packages = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: packages.length,
        packages  
    })

})

exports.getSinglePackage = catchAsyncErrors(async (req, res, next) => {

    const package = await Package.findById(req.params.id);

    if(!package){
        return next(new ErrorHandler('Package not found', 404))
    }

    res.status(200).json({
        success: true,
        package
    })
})

// update package

exports.updatePackage = catchAsyncErrors(async  (req, res, next) => {
    
    let package = await Package.findById(req.params.id);

    if(!package){
        return next(new ErrorHandler('Package not found', 404))
    }

    package = await Package.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify:false
    });

    res.status(200).json({
        success: true,
        package
    })
})

// delete package

exports.deletePackage = catchAsyncErrors(async  (req, res, next) => {
    
    const package = await Package.findById(req.params.id);

    if(!package){
        return next(new ErrorHandler('Package not found', 404))
    }

    await package.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Package removed successfully'
    })
})
    
    
