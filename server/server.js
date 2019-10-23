var express =require('express')
var app = express();
var bodyParser =require('body-parser');
var morgan =require('morgan');
var mongoose =require('mongoose');
var port =process.env.Port || 8080;
var jwt = require('jsonwebtoken');

//change ok
var superSecret = 'ilovekatekyohitmanreborn';

//mongoose.connect('mongodb://localhost:27017/WebFastFood_Mean');

//APP CONFIGURATION
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method','GET,POST');
    res.setHeader('Access-Control-Allow-Headers','X-request-With,content-type, Authorization');
    next();
});

//log all request to console
app.use(morgan('dev'));

mongoose.Promise=global.Promise;
// mongoose.connect('mongodb://localhost:27017/WebFastFood_Mean',{useNewUrlParser:true});
mongoose.connect('mongodb://localhost:27017/WebFastFood_Mean',{useNewUrlParser:true});
mongoose.set('useCreateIndex',true);

//ROUTES FOR API

//basic route for the home page
app.get('/',function(req,res){
    res.send('Welcome to the home page !');
});

var url = 'mongodb://localhost:27017/WebFastFood_Mean';

//get an instance of the express router
var apiRouter=express.Router();

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://localhost', function (err, client) {
  if (err) throw err;

  var db = client.db('WebFastFood_Mean');

  var account = db.collection('ACCOUNT')
    account.find().toArray((err, items) => {
        console.log(items)
      })

    //    app.get(function(req,res){
    //         account.find(function(err,accounts){
    //             if(err) return res.send(err);
        
    //             //return users
    //             res.json(accounts);
    //         });
    //     });

}); 



//register
app.use('/api',apiRouter);
apiRouter.route('/accounts')

//basic route for the home page
app.get('/accounts',function(req,res){
    res.send('Welcome to the home page !');
});

//var account = db

// app.get(function(req,res){
//     account.find(function(err,accounts){
//         if(err) return res.send(err);

//         //return users
//         res.json(accounts);
//     });
// });

app.listen(port);
console.log('Port can dung la' + port);