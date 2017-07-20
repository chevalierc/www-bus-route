var path = require('path');
var config = require('../config/config');

// API ROUTES ------------------------
module.exports = function (app, express) {

    publicRoutes = config.publicRoutes
    privateRoutes = config.privateRoutes

    for(var i = 0; i < publicRoutes.length; i++){
        var routeLocation = "../" + publicRoutes[i]
        var curRoute = require(routeLocation)(app, express);
        app.use('/api', curRoute);
    }

    app.get('/', function(req, res) {
        res.render('pages/index');
    });

    app.get('*', function(req, res) {
        var pageToGet = req.originalUrl.split('.')[0]
        res.render('pages' + pageToGet);
    });

    var curRoute = require('../routes/route.auth')(app, express);
    app.use('/api', curRoute);

    for(var i = 0; i < privateRoutes.length; i++){
        var routeLocation = "../" + privateRoutes[i]
        var curRoute = require(routeLocation)(app, express);
        app.use('/api', curRoute);
    }

}
