var sqlHelper = require( '../helpers/sqlHelper' )

module.exports = function( app, express ) {
    var apiRouter = express.Router();

    apiRouter.route( '/commute/:id' )
        //get commutes
        .get( function( req, res ) {
            sqlHelper.find( {
                table: "commute",
                findObject: {
                    userId: req.params.id
                }
            }, function( err, rows, cols ) {
                if ( err ) {
                    return res.json( {
                        success: false,
                        error: err
                    } )
                } else {
                    return res.json( rows )
                }
            } );
        } )

        //create commute
        .put( function( req, res ) {
            sqlHelper.create( {
                table: "commute",
                object: req.body
            }, function( err, rows, cols ) {
                if ( err ) {
                    return res.json( {
                        success: false,
                        error: err
                    } )
                } else {
                    return res.json( {
                        success: true
                    } );
                }
            } );
        } )

        //edit commute
        .put( function( req, res ) {
            sqlHelper.update( {
                table: "commute",
                object: req.body
            }, function( err, rows, cols ) {
                if ( err ) {
                    return res.json( {
                        success: false,
                        error: err
                    } )
                } else {
                    return res.json( {
                        success: true
                    } );
                }
            } );
        } )

        return apiRouter;
};
