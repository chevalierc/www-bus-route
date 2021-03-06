module.exports = {
    port: process.env.PORT || 8080, //'port': process.env.PORT || 8080,

    //Whether the sqlhelper module logs every command it runs. helpful for debugging
    logSQL: true,

    database: {
        host: "us-cdbr-iron-east-03.cleardb.net",
        user: "bb6bc7b13083e4",
        password: '6ab5298b',
        database: "heroku_1588b8642669eca",
        connectionLimit: 4,
    },

    secret: 'SwiftySecret', //For Token encryption

    publicRoutes: [
        'routes/route.createUser',
        'routes/route.visual',

    ],

    privateRoutes: [
        'routes/route.user',
        'routes/route.commute',
	    'routes/route.route'
    ]

};
