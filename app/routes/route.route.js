var sqlHelper = require( '../helpers/sqlHelper' )

module.exports = function( app, express ) {
    var apiRouter = express.Router();

    apiRouter.route('/upvote_route/:id')
    .post( function( req, res ) {
        if(!req.decoded || !req.decoded.id){
            return res.json( {
                success: false,
                error: "Not logged on"
            } )
        }
        sqlHelper.query( {
            sql: "INSERT INTO user_route (route_id, user_id, upvoted) VALUES (?,?,0)"
            + " ON DUPLICATE KEY update user_route.upvoted = user_route.upvoted;",
            values: [req.params.id, req.decoded.id]
        }, function( err, rows, cols ) {
            if ( err ) {
                return res.json( {
                    success: false,
                    error: err
                } )
            } else {
                sqlHelper.query( {
                    sql: " UPDATE changes c"
                    + " left join user_route on c.id = user_route.route_id"
                    + " SET user_route.upvoted = IF(user_route.upvoted = 1, 0, 1),"
                    + " c.upvotes = IF(user_route.upvoted = 1, c.upvotes - 1, c.upvotes + 1)"
                    + " WHERE c.id = ? and user_route.user_id = ?",
                    values: [req.params.id, req.decoded.id]
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
            }
        } );
    } )

    apiRouter.route( '/route' )
        //get routes for user
        .get( function( req, res ) {
            if(!req.decoded || !req.decoded.id){
                return res.json( {
                    success: false,
                    error: "Not logged on"
                } )
            }
            sqlHelper.query( {
                sql: "SELECT * FROM changes left join (select upvoted, route_id from user_route where user_id = ?) as q on changes.id = q.route_id;",
                values: [req.decoded.id]
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

	//edit route
        // .put( function( req, res ) {
        //     sqlHelper.update( {
        //         table: "changes",
        //         object: req.body
        //     }, function( err, rows, cols ) {
        //         if ( err ) {
        //             return res.json( {
        //                 success: false,
        //                 error: err
        //             } )
        //         } else {
        //             return res.json( {
        //                 success: true
        //             } );
        //         }
        //     } );
        // } )

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

apiRouter.route( '/votes' )
        //get commutes
        .post( function( req, res ) {

            sqlHelper.update( {
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
                        success: true,
                        data : rows
                    } )
                }
            } );
        } )

 return apiRouter;
};
