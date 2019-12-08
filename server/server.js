var express = require('express');
var app = express();                 // define our app using express
var bodyParser = require('body-parser');    // get body-parser
var morgan = require('morgan');         // used to see requests
var mongoose = require('mongoose');
var config = require('./database/DB');
var path = require('path');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var Account = require('./app/models/account');
var KhachHang = require('./app/models/khachhang');
// var configjwt = require('./database/config');
// const tokenList = {};
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
//var popups = require('popups');

app.use(cors({
  origin: 'https://localhost:4200'
}));

//change ok
var superSecret = 'ilovekatekyohitmanreborn';
var currenttendn;

mongoose.set('useCreateIndex', true);
mongoose
  .connect(config.DB, { useNewUrlParser: true },
    console.log("da connect!!!"))
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connected failed!')
  });


app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH,PUT, DELETE, OPTIONS"
//   );
//   //res.setHeader(Access-Control-Allow-Origin: *)
//   next();
// });

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Authorization');
  next();
});



var apiRouterAuth = express.Router();

apiRouterAuth.post('/authenticate', function (req, res) {

  //find user
  Account.findOne({
    tendn: req.body.tendn
  }).select('tendn matkhau quyenhan').exec(function (err, account) {
    if (err) throw err;

    //no user with that username was found
    if (!account) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (account) {

      //check if password matches
      var validPassword = account.comparePassword(req.body.matkhau);
      if (!validPassword) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password'
        });
      } else {

        //if user is found and password is right
        //create a token
        
        var token = jwt.sign({

          account
        }, superSecret, {
          expiresIn: '300s', //expires in 15ph
          
        });

        var id = account._id;

        //return information including token as JSON
        res.json({
          success: true,
          message: 'User da duoc cap nhat token!',
          token: token,
          account,
          id: id
        });

      }
    }
  });
});

apiRouterAuth.post('/sociallogin', function (req, res) {

  token: req.body.token;
  //find user
  KhachHang.findOne({
    email: req.body.email
  }).select('_id tendn hoten diachi email sdt tichluy').exec(function (err, khachhang) {
    if (err) throw err;

    //no user with that username was found
    if (!khachhang) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (khachhang) {

      //check if password matches


      //if user is found and password is right
      //create a token

      token = jwt.sign({

        khachhang
      }, superSecret, {
        expiresIn: '300s', //expires in 15ph

      });

      //return information including token as JSON
      res.json({
        success: true,
        message: 'User da duoc cap nhat token!',
        token: token,
        khachhang
      });


    }
  });
});


//k cho phep lam gi ma khong co token
const TokenCheckMiddleware = async (req, res, next) => {
  console.log('Dang lam tren app');

  //check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  //decode token
  if (token) {

    console.log('Co token');
    var interval;
    //verify secret and check exp
    jwt.verify(token, superSecret, function (err, decoded) {
      if (err) {
        console.log('het token');
        return res.json({
          success: false,
          message: 'Failed to authenticate token',
          //console.error()
        
        });
      } else {
        //save request for use in other routes
        req.decoded = decoded;
        next(); //make sure go to next routes and don't stop here
      }
    });
  } else {
    
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
}

apiRouterAuth.get('/currentuser', function(req, res){
  Account.findOne({
    tendn: req.body.tendn
  }).select('tendn matkhau quyenhan').exec(function (err, account){
    if(err) res.send(err);

    res.json(account);
  })
});

apiRouterAuth.get('/currentkh/:tendn', function(req, res){
  KhachHang.findOne({
    tendn: req.params.tendn
  }).select('_id tendn hoten diachi email sdt tichluy').exec(function (err, khachhang){
    if(err) res.send(err);
    res.json({ message: khachhang,success:true });
  })
});
 


app.use('/api', apiRouterAuth);

var apiAccount = require('./app/routes/accountApi')(app, express);
var apiLoaiSP = require('./app/routes/loaispApi')(app, express);
var apiSanPham = require('./app/routes/sanphamApi')(app, express);
var apiTinKM = require('./app/routes/tinkmApi')(app, express);
var apiNhanVien = require('./app/routes/nhanvienApi')(app, express);
var apiKhachHang = require('./app/routes/khachhangApi')(app, express);
var apiHoaDon = require('./app/routes/hoadonApi')(app, express);
var apiCTHoaDon = require('./app/routes/cthoadonApi')(app, express);

apiRouterAuth.use(TokenCheckMiddleware);

app.use('/api',apiRouterAuth);
app.use('/api', apiAccount);
app.use('/api', apiLoaiSP);
app.use('/api/sanpham', apiSanPham);
app.use('/api/tinkm', apiTinKM);
app.use('/api/nhanvien', apiNhanVien);
app.use('/api/khachhang', apiKhachHang);
app.use('/api/hoadon', apiHoaDon);
app.use('/api/cthoadon', apiCTHoaDon);



// START THE SERVER
// ====================================
app.listen(3000);
console.log('Dang dung Port: ' + config.PORT);