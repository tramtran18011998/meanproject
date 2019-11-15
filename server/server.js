var express = require('express');
var app = express();                 // define our app using express
var bodyParser = require('body-parser');    // get body-parser
var morgan = require('morgan');         // used to see requests
var mongoose = require('mongoose');
var config = require('./database/DB');
var path = require('path');
var cors = require('cors');

mongoose
  .connect(config.DB, { useNewUrlParser: true },
    console.log("da connect!!!"))
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connected failed!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE, OPTIONS"
  );
  next();
});



var apiAccount = require('./app/routes/accountApi')(app, express);
app.use('/api', apiAccount);


var apiLoaiSP = require('./app/routes/loaispApi')(app, express);
var apiSanPham = require('./app/routes/sanphamApi')(app, express);
var apiTinKM = require('./app/routes/tinkmApi')(app, express);
var apiNhanVien = require('./app/routes/nhanvienApi')(app, express);
var apiKhachHang = require('./app/routes/khachhangApi')(app, express);
var apiHoaDon = require('./app/routes/hoadonApi')(app, express);
var apiCTHoaDon = require('./app/routes/cthoadonApi')(app, express);

app.use('/api', apiLoaiSP);
app.use('/api/sanpham', apiSanPham);
app.use('/api/tinkm', apiTinKM);
app.use('/api/nhanvien', apiNhanVien);
app.use('/api/khachhang', apiKhachHang);
app.use('/api/hoadon', apiHoaDon);
app.use('/api/cthoadon', apiCTHoaDon);



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
// //here is the magic

// apiRoutes.use(cors(corsOptions));
// app.use(apiRoutes);



// START THE SERVER
// ====================================
app.listen(config.PORT);
console.log('Dang dung Port: ' + config.PORT);