var bcrypt = require( 'bcrypt-nodejs' );
var sqlHelper = require( '../helpers/sqlHelper' )
var config = require( '../config/config' );
var jwt = require( 'jsonwebtoken' );

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
                    var token = jwt.sign( {
                        id: rows.insertId,
                        email: contents.email
                    }, config.secret, {
                        expiresInMinutes: 30 * 24 * 60
                    } );

                    // return the information including token as JSON
                    return res.json( {
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    } );
                }
            } );
        } )

    return apiRouter;
};
