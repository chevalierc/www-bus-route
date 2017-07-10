module.exports = {
    port: 80, //'port': process.env.PORT || 8080,

    //Whether the sqlhelper module logs every command it runs. helpful for debugging
    logSQL: true,

    database: {
        host: "us-cdbr-iron-east-03.cleardb.net",
        user: "b386642be81341",
        password: '79f62f3e',
        database: "heroku_2619f3a36644089",
        connectionLimit: 20,
    },

    secret: 'SwiftySecret', //For Token encryption

    publicRoutes: [
        'routes/route.createUser'
    ],

    privateRoutes: [
        'routes/route.user'
    ],

    dbColumns: {
        users: [ 'nickname', 'email', 'id', 'password' ],
    }
};
