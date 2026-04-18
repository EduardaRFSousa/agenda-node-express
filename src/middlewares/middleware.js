exports.middlewareGlobal = (req, res, next) => {
    console.log('Passei no Middleware Global');
    next();
};

exports.outroMiddleware = (req, res, next) => {
    console.log('Passei no Outro Middleware');
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if (err && err.code === 'EBADCSRFTOKEN') {
        return res.render('404');
    }
    next(err);
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}