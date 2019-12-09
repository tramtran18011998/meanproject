var express = require('express');
var app = express();                 // define our app using express
var bodyParser = require('body-parser');    // get body-parser
var morgan = require('morgan');         // used to see requests
var mongoose = require('mongoose');
var config = require('./database/DB');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var Account = require('./app/models/account');
var KhachHang = require('./app/models/khachhang');

app.use(cors({
  origin: 'https://localhost:4200'
}));

//change ok
var superSecret = 'ilovekatekyohitmanreborn';
var superSecretface = 'ilovekatekyohitmanrebornface';

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


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Authorization');
  next();
});

var apiRouterAuth = express.Router();
apiRouterAuth.post('/authenticate', function (req, res) {
  
  Account.findOne({
    tendn: req.body.tendn
  }).select('tendn matkhau quyenhan').exec(function (err, account) {
    if (err) throw err;

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
        //create a token
        
        var token = jwt.sign({
          account
        }, superSecret, {
          expiresIn: '1h', //expires in 15ph
          
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

//set lại token từ facebook
apiRouterAuth.post('/socialloginface', function (req, res) {
  req.body.token
  console.log(req.body.token);
  // res.setHeader('x-access-token', req.body.token);
  var kh = new KhachHang();   
  var token = req.body.token;
  KhachHang.findOne({
    email: req.body.email,
    hoten : req.body.name,  
  }).select('_id tendn hoten diachi email sdt tichluy').exec(function (err, khachhang) {
    if (err) throw err;
    if (!khachhang) {
       
      kh.email = req.body.email;
      kh.hoten = req.body.name;
      kh.save(function(err) {
        if (err) {
            // duplicate entry
            if (err.code == 11000) 
                return res.json({ success: false, message: 'KH already exists. '});
            else 
                return res.send(err);
        }
      
      token = jwt.sign({
        khachhang
      }, superSecret, {
        expiresIn: '1h', //expires in 15ph
      });
      res.json({
        success: true,
        message: 'User da duoc cap nhat token!',
        token: token,
        khachhang
      });

    });
      // res.json({
      //   success: false,
      //   message: 'Authentication failed. User not found.'
      // });
    } else if (khachhang) {

      console.log(khachhang);
      //create a token
      
      token = jwt.sign({
        khachhang
      }, superSecret, {
        expiresIn: '1h', //expires in 15ph
      });

      res.json({
        success: true,
        message: 'User da duoc cap nhat token!',
        token: token,
        khachhang
      });


    }
  });
});

//set lại token từ google
apiRouterAuth.post('/sociallogingg', function (req, res) {
  req.body.token
  console.log(req.body.token);
  // res.setHeader('x-access-token', req.body.token);
  var kh = new KhachHang();   
  var token = req.body.token;
  KhachHang.findOne({
    email: req.body.email,
    hoten : req.body.name,  
  }).select('_id tendn hoten diachi email sdt tichluy').exec(function (err, khachhang) {
    if (err) throw err;
    if (!khachhang) {
       
      kh.email = req.body.email;
      kh.hoten = req.body.name;
      kh.save(function(err) {
        if (err) {
            // duplicate entry
            if (err.code == 11000) 
                return res.json({ success: false, message: 'KH already exists. '});
            else 
                return res.send(err);
        }
      
      token = jwt.sign({
        khachhang
      }, superSecret, {
        expiresIn: '1h', //expires in 15ph
      });
      res.json({
        success: true,
        message: 'User da duoc cap nhat token!',
        token: token,
        khachhang
      });

    });
      // res.json({
      //   success: false,
      //   message: 'Authentication failed. User not found.'
      // });
    } else if (khachhang) {

      console.log(khachhang);
      //create a token
      
      token = jwt.sign({
        khachhang
      }, superSecret, {
        expiresIn: '1h', //expires in 15ph
      });

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

  console.log("tokem: "+token);
  //decode token
  if (token) {

    //console.log('Co token');
    
    //verify secret and check exp
    jwt.verify(token, superSecret, function (err, decoded) {
      if (err) {
        console.log(err);
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