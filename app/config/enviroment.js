var express = require( 'express' );
var config = require( './config' );
var bodyParser = require( 'body-parser' );
var morgan = require( 'morgan' );
var favicon = require( 'serve-favicon' );

// APP CONFIGURATION ==================
// ====================================

module.exports = function( app ) {
    // use body parser so we can grab information from POST requests
    app.use( bodyParser.urlencoded( {
        extended: true
    } ) );
    app.use( bodyParser.json() );

    //set view engine
    //app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    app.use( express.static( __dirname + '/../../static' ) );

    // configure our app to handle CORS requests
    app.use( function( req, res, next ) {
        res.setHeader( 'Access-Control-Allow-Origin', '*' );
        res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST' );
        res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization' );
        next();
    } );

    // log all requests to the console
    app.use( morgan( 'dev' ) );
};
