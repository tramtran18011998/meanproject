var Account = require('../models/account');
var jwt = require('jsonwebtoken');
var config = require('../../database/DB');
var cors = require('cors');

// super secret for creating tokens
//var superSecret = config.secret;
// var originsWhitelist = [
//   'http://localhost:4200',      //this is my front-end url for development

// ];
// var corsOptions = {
//   origin: function(origin, callback){
//         var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
//         callback(null, isWhitelisted);
//   },
//   credentials:true
// }
//here is the magic
// app.use(cors(corsOptions));

module.exports = function (app, express) {

    var apiRouter = express.Router();

    // route to authenticate a user (POST http://localhost:8080/api/authenticate)
    // apiRouter.post('/authenticate', function(req, res) {
    //     console.log(req.body.username);

    //   // find the user
    //   User.findOne({
    //     username: req.body.username
    //   }).select('name username password').exec(function(err, user) {

    //     if (err) throw err;

    //     // no user with that username was found
    //     if (!user) {
    //       res.json({ 
    //         success: false, 
    //         message: 'Authentication failed. User not found.' 
    //         });
    //     } else if (user) {

    //       // check if password matches
    //       var validPassword = user.comparePassword(req.body.password);
    //       if (!validPassword) {
    //         res.json({ 
    //             success: false, 
    //             message: 'Authentication failed. Wrong password.' 
    //             });
    //       } else {

    //         // if user is found and password is right
    //         // create a token
    //         var token = jwt.sign({
    //             name: user.name,
    //             username: user.username
    //         }, superSecret, {
    //           expiresIn: '24h' // expires in 24 hours
    //         });

    //         // return the information including token as JSON
    //         res.json({
    //           success: true,
    //           message: 'Enjoy your token!',
    //           token: token
    //         });
    //       }   

    //     }

    //   });
    // });

    // // route middleware to verify a token
    // apiRouter.use(function(req, res, next) {
    //     // do logging
    //     console.log('Somebody just came to our app!');

    //   // check header or url parameters or post parameters for token
    //   var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //   // decode token
    //   if (token) {

    //     // verifies secret and checks exp
    //     jwt.verify(token, superSecret, function(err, decoded) {      
    //       if (err)
    //         return res.json({ success: false, message: 'Failed to authenticate token.' });    
    //       else
    //         // if everything is good, save to request for use in other routes
    //         req.decoded = decoded;    
    //     });

    //   } else {

    //     // if there is no token
    //     // return an HTTP response of 403 (access forbidden) and an error message
    //     return res.status(403).send({ 
    //         success: false, 
    //         message: 'No token provided.' 
    //     });

    //   }

    //   next(); // make sure we go to the next routes and don't stop here
    // });


    // ----------------------------------------------------
    apiRouter.route('/account')

        .post(function (req, res) {

            var account = new Account();      // create a new instance of the User model
            account.tendn = req.body.tendn;  // set the users name (comes from the request)
            account.matkhau = req.body.matkhau;  // set the users username (comes from the request)
            account.quyenhan = req.body.quyenhan;  // set the users password (comes from the request)

            account.save(function (err, account) {
                if (err) {
                    // duplicate entry
                    if (err.code == 11000)
                        return res.json({ success: false, message: 'A user with that username already exists. ' });
                    else
                        return res.send(err);
                }

                else {

                    return res.json({ success: true, message: 'Account created!' });
                }
                // return a message
                // res.json({ message: 'Account created!' });
            });

        })

        .get(function (req, res) {
            Account.find(function (err, accounts) {
                if (err) res.send(err);

                // return the users
                res.json(accounts);
            });
        });



    apiRouter.route('/account/:account_id')

        .get(function (req, res) {
            Account.findById(req.params.account_id, function (err, account) {
                if (err) res.send(err);

                // return that user
                res.json(account);
            });
            
        })

        .put(function (req, res) {
            Account.findById(req.params.account_id, function (err, account) {

                if (err) res.send(err);

                // set the new user information if it exists in the request
                if (req.body.tendn) account.tendn = req.body.tendn;
                if (req.body.matkhau) account.matkhau = req.body.matkhau;
                if (req.body.quyenhan) account.quyenhan = req.body.quyenhan;

                // save the user
                account.save(function (err) {
                    if (err) res.send(err);

                    // return a message
                    res.json({ message: 'User updated!' });
                });

            });
        })

        .delete(function (req, res) {
            Account.remove({

                //xoa account = ten dang nhap
                tendn: req.params.account_id
            }, function (err, account) {
                if (err) res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });

    return apiRouter;
};
