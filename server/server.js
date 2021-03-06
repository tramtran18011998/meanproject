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
var nodemailer = require('nodemailer');
//var localStorage = require('node-localstorage');
var checkReset = false;

var emailStore;
var hotenStore;

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


app.use(function (req, res, next) {
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
          expiresIn: '24h', //expires in 15ph

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
apiRouterAuth.post('/signup', function (req, res) {

  var account = new Account();      // create a new instance of the User model
  account.tendn = req.body.tendn;  // set the users name (comes from the request)
  account.matkhau = req.body.matkhau;  // set the users username (comes from the request)
  account.quyenhan = req.body.quyenhan;  // set the users password (comes from the request)

  account.save(function (err, account) {
    if (err) {
      // duplicate entry
      if (err.code == 11000)
        return res.json({ success: false, message: 'A user with that username already exists. ' });
      
    }

    // return a message
    // res.json({ message: 'Account created!' });
  });
  var khachhang = new KhachHang();
  khachhang.tendn = req.body.tendn;
  khachhang.hoten = req.body.hoten;
  khachhang.diachi = req.body.diachi;
  khachhang.email = req.body.email;
  khachhang.sdt = req.body.sdt;
  khachhang.tichluy = req.body.tichluy;


  khachhang.save(function (err) {
    if (err) {
      // duplicate entry
      if (err.code == 11000)
        return res.json({ success: false, message: 'KH already exists. ' });
      
    }


  });

  var token = jwt.sign({
    account
  }, superSecret, {
    expiresIn: '24h', //expires in 15ph

  });
  var id = account._id;
  //return information including token as JSON
  res.json({
    success: true,
    message: 'User da duoc cap nhat token!',
    token: token
  });
});


var curkh = new KhachHang();
var curacc = new Account();
//var curtendn;
var id;
var password;
//get email send mail
apiRouterAuth.post('/mailresetpassword', function (req, res) {

  var token = jwt.sign({
    curacc
  }, superSecret, {
    expiresIn: '24h', //expires in 15ph

  });



  //tim khachhang theo email
  KhachHang.findOne({
    email: req.body.email
  }).select('_id tendn hoten diachi email sdt tichluy').exec(function (err, khachhang) {
    if (err) res.send(err);
    curkh = khachhang;
    console.log(curkh);
    //console.log("tdn :"+curkh.tendn);
    curtendn = curkh.tendn;
    console.log("tdn :" + curtendn);

    //tim account theo tendn
    Account.findOne({
      tendn: curtendn
    }).select('_id tendn matkhau quyenhan').exec(function (err, account) {
      if (err) res.send(err);
      curacc = account;
      //console.log(account);
      id = account._id;
      password = req.body.matkhau;
      console.log("acc: " + curacc);

      token = jwt.sign({
        account
      }, superSecret, {
        expiresIn: '24h', //expires in 15ph

      });

      console.log("acc token: " + token);

      //send mail
      //step 1:
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tram01299577036@gmail.com',
          pass: 'tram01299577036'
        }
      });

      // step 2:
      let mailOptions = {
        from: 'tram01299577036@gmail.com',
        to: req.body.email,
        //headline of mail
        subject: 'Confirm GINs CHICKEN Account',
        html: 'http://localhost:3000/api/checkresetPassword?token=' + token
      };

      //step 3:
      transporter.sendMail(mailOptions, function (err, data) {

        if (err) { console.log('Error occurs' + err) }
        else {
          console.log("Mail sent !!" + data);
        }
      })


      console.log(checkReset);
    })
  })



});


apiRouterAuth.get('/checkresetPassword', function (req, res) {
  checkReset = true;
  console.log(id);
  Account.findById(id, function (err, account) {
    if (err) res.send(err);

    account.matkhau = password;
    // save the user
    account.save(function (err) {
      if (err) res.send(err);
      else{
        //res.json('success');
        console.log('successss');
      }
      // return a message
      //res.json({ message: account, success: true });
    });

  });
  res.json('Đổi mật khẩu thành công!!');
})

apiRouterAuth.put('/resetPassword/:account_id', function (req, res) {
  if (checkReset == true) {
    Account.findById(req.params.account_id, function (err, account) {
      if (err) res.send(err);

      if (req.body.matkhau) account.matkhau = req.body.matkhau;
      // save the user
      account.save(function (err) {
        if (err) res.send(err);
        // return a message
        res.json({ message: account, success: true });
      });

    });
  } else {
    res.json({ message: 'Fail to reset password', success: false });
  }

})

//set lại token từ facebook
apiRouterAuth.post('/socialloginface', function (req, res) {
  req.body.token
  console.log(req.body.token);
  // res.setHeader('x-access-token', req.body.token);
  var kh = new KhachHang();
  var token = req.body.token;
  KhachHang.findOne({
    email: req.body.email,
    hoten: req.body.name,
  }).select('_id tendn hoten diachi email sdt tichluy').exec(function (err, khachhang) {
    if (err) throw err;
    if (!khachhang) {

      //step 1:
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tram01299577036@gmail.com',
          pass: 'tram01299577036'
        }
      });

      // step 2:
      let mailOptions = {
        from: 'tram01299577036@gmail.com',
        to: req.body.email,
        //headline of mail
        subject: 'Confirm GINs CHICKEN Account',
        html: 'https://localhost:4200/trangchu'
      };

      //step 3:
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) { console.log('Error occurs' + err) }
        else {
          console.log("Mail sent !!" + data);
        }
      })

      kh.email = req.body.email;
      kh.hoten = req.body.name;
      kh.save(function (err) {
        if (err) {
          // duplicate entry
          if (err.code == 11000)
            return res.json({ success: false, message: 'KH already exists. ' });
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
    hoten: req.body.name,
  }).select('_id tendn hoten diachi email sdt tichluy').exec(function (err, khachhang) {
    if (err) throw err;
    if (!khachhang) {


      //step 1:
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tram01299577036@gmail.com',
          pass: 'tram01299577036'
        }
      });

      // step 2:
      let mailOptions = {
        from: 'tram01299577036@gmail.com',
        to: req.body.email,
        //headline of mail
        subject: 'Confirm GINs CHICKEN Account',
        html: 'https://localhost:4200/trangchu'
      };

      //step 3:
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) { console.log('Error occurs' + err) }
        else {
          console.log("Mail sent !!" + data);
        }
      })


      kh.email = req.body.email;
      kh.hoten = req.body.name;
      kh.save(function (err) {
        if (err) {
          // duplicate entry
          if (err.code == 11000)
            return res.json({ success: false, message: 'KH already exists. ' });
          else
            return res.send(err);
        }

        token = jwt.sign({
          khachhang
        }, superSecret, {
          expiresIn: '30s', //expires in 15ph
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
        expiresIn: '30s', //expires in 15ph
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

  console.log("tokem: " + token);
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

apiRouterAuth.get('/currentuser', function (req, res) {
  Account.findOne({
    tendn: req.body.tendn
  }).select('tendn matkhau quyenhan').exec(function (err, account) {
    if (err) res.send(err);

    res.json(account);
  })
});

apiRouterAuth.get('/currentkh/:tendn', function (req, res) {
  KhachHang.findOne({
    tendn: req.params.tendn
  }).select('_id tendn hoten diachi email sdt tichluy').exec(function (err, khachhang) {
    if (err) res.send(err);
    res.json({ message: khachhang, success: true });
  })
});

apiRouterAuth.get('/current/:email', function (req, res) {
  KhachHang.findOne({
    email: req.params.email
  }).select('_id tendn hoten diachi email sdt tichluy').exec(function (err, khachhang) {
    if (err) res.send(err);
    res.json({ message: khachhang, success: true });
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

app.use('/api', apiRouterAuth);
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