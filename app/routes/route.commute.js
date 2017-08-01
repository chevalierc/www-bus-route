var sqlHelper = require( '../helpers/sqlHelper' )

module.exports = function( app, express ) {
    var apiRouter = express.Router();

    apiRouter.route( '/commute' )
        //create commute
        .post( function( req, res ) {
            req.body.userId = req.decoded.id
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

    apiRouter.route( '/commutes' )
        //get commutes for user
        .get( function( req, res ) {
            if(!req.decoded || !req.decoded.id){
                return res.json( {
                    success: false,
                    error: "Not logged on"
                } )
            }
            sqlHelper.find( {
                table: "commute",
                find:{
                    userId: req.decoded.id
                }
            }, function( err, rows, cols ) {
                if ( err ) {
                    return res.json( {
                        success: false,
                        error: err
                    } )
                } else {
                    return res.json( {
                        success: true,
                        commutes: rows
                    } );
                }
            } );
        } )

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

        //delete commute
        .delete( function( req, res ) {
            sqlHelper.remove( {
                table: "commute",
                id: req.params.id
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
