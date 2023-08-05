const {ValidationError} = require ('sequelize')

function logErrors(err,req,res,next) {
    next(err);
}

function errorHandler(err,req,res) {
    res.status(500).json({
        statusCode: 500,
        message: err.message,
        err: err.stack,
    });
}

function ormHandler(err,req,res,next) {
    if (err instanceof ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: err.name,
            errors: err.errors
        });
    }
    next(err)
}

function boomErrorHandler(err,req,res,next) {
    if(err.isBoom){
        const {output} = err;
        console.log(output);
        res.status(output.statusCode).json(output.payload) 
    }
    next(err)
}

module.exports = {
    logErrors,
    errorHandler,
    ormHandler,
    boomErrorHandler
}