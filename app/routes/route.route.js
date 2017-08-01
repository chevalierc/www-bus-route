var sqlHelper = require( '../helpers/sqlHelper' )

module.exports = function( app, express ) {
    var apiRouter = express.Router();

    

    apiRouter.route( '/route' )
        //get commutes for user
        .get( function( req, res ) {
            if(!req.decoded || !req.decoded.id){
                return res.json( {
                    success: false,
                    error: "Not logged on"
                } )
            }
            sqlHelper.find( {
                table: "changes",
                
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

	//edit commute
        .put( function( req, res ) {
            sqlHelper.update( {
                table: "changes",
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

    apiRouter.route( '/route/:id' )
        //get commutes
        .get( function( req, res ) {
		sqlHelper.get( {
                table: "changes",
                id: req.params.id
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
apiRouter.route( '/comment/:id' )
        //get commutes
        .get( function( req, res ) {
	    
            sqlHelper.find( {
                table: "comments",
                find: {
                    commuteId: req.params.id
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
        } ).post( function( req, res ) {
            
            sqlHelper.create( {
                table: "comments",
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
