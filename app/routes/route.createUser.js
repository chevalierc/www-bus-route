var bcrypt = require( 'bcrypt-nodejs' );
var sqlHelper = require( '../helpers/sqlHelper' )
var moment = require( 'moment' )

module.exports = function( app, express ) {
    var apiRouter = express.Router();

    apiRouter.route( '/users' )
        .post( function( req, res ) {
            var contents = req.body
            contents.password = bcrypt.hashSync(contents.password) //hash the password
            sqlHelper.create( {
                table: "user",
                object: contents,
            }, function( err, rows ) {
                if ( err ) {
                    if ( err.errno == 1062 ) {
                        return res.json( {
                            success: false,
                            message: "That email has already been used"
                        } )
                    } else {
                        return res.json( {
                            success: false,
                            message: "Error right now. Try again later."
                        } )
                    }

                } else {
                    return res.json( {
                        success: true
                    } );
                }
            } );
        } )

    return apiRouter;
};
