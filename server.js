// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var path = require( 'path' );
var mysql = require( "mysql" );
var sqlHelper = require('./app/helpers/sqlHelper.js')
var express = require( 'express' );
var config = require( './app/config/config' );
var environment = require( './app/config/enviroment' );
var routes = require( './app/config/routes' );

//call express
app = express()

//set up configurables
environment( app );

//connect to db
sqlHelper.connect( config.database, function(){
    //set up routes
    routes( app, express );

    sqlHelper.find({
        table: "commute",
        find: {
            id: 100
        }
    }, function(){

    })

    //should show previously hidden errors
    process.on( 'unhandledRejection', console.log )

    // START THE SERVER
    // ====================================
    app.listen( config.port );
    console.log( 'Magic happens on port ' + config.port );

})
