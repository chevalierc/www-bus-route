var bcrypt = require( 'bcrypt-nodejs' );
var sqlHelper = require( '../helpers/sqlHelper' )
var config = require( '../config/config' );
var jwt = require( 'jsonwebtoken' );

module.exports = function( app, express ) {
    var apiRouter = express.Router();

    apiRouter.route( '/visual' )
        .get( function( req, res ) {
            sqlHelper.find( {
                table: "commute"
            }, function( err, rows ) {
                if ( err ) {
                    return res.json( {
                        success: false,
                        message: err
                    } )
                } else {
                    var data = []
                    for(var i = 0; i < rows.length; i++){
                        data.push({
                            lat: rows[i].startLocationLat,
                            long: rows[i].startLocationLong,
                        })
                        data.push({
                            lat: rows[i].endLocationLat,
                            long: rows[i].endLocationLong,
                        })
                    }
                    // return the information including token as JSON
                    return res.json( {
                        success: true,
                        data: data
                    } );
                }
            } );
        } )

    return apiRouter;
};
