var controller = require('../controllers/sanpham.controller');
var SanPham = require('../models/sanpham');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const now = new Date().toISOString(); const date = now.replace(/:/g, '-');
    cb(null, date + file.originalname);
    //cb(null,file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    //limit 5mb
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// var cors= require('cors');

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
// //app.use(cors(corsOptions));

module.exports = function (app, express) {

  var apiRouter = express.Router();
  //apiRouter.use(cors(corsOptions));

  apiRouter.route('/')
    .post(upload.single('hinhsp'), (req, res) =>{
      var sanpham = new SanPham();
      sanpham.tensp = req.body.tensp;
      sanpham.soluong = req.body.soluong;
      sanpham.giabd = req.body.giabd;
      sanpham.giaban = req.body.giaban;
      sanpham.ttkm = req.body.ttkm;
      sanpham.hinhsp = req.file.path;
      sanpham.maloai = req.body.maloai;
  
      sanpham.save(function (err) {
          if (err) {
              // duplicate entry
              if (err.code == 11000)
                  return res.json({ success: false, message: 'San Pham already exists. ' });
              else
                  return res.send(err);
          }else{
            return res.json({ message: 'San Pham created!' });
          }
  
      });
  })
    .get(controller.getList);

    apiRouter.route('/:sanpham_id')
    .get(controller.getById)

    // update 
    .put(function (req, res) {
      SanPham.findById(req.params.sanpham_id, function (err, sanpham) {

        if (err) res.send(err);

        // set the new information if it exists in the request
        if (req.body.tensp) sanpham.tensp = req.body.tensp;
        if (req.body.soluong) sanpham.soluong = req.body.soluong;
        if (req.body.giabd) sanpham.giabd = req.body.giabd;
        if (req.body.giaban) sanpham.giaban = req.body.giaban;
        if (req.body.ttkm) sanpham.ttkm = req.body.ttkm;
        //if (req.file.path) sanpham.hinhsp = req.file.path;
        if (req.body.maloai) sanpham.maloai = req.body.maloai;

        // save 
        sanpham.save(function (err) {
          if (err) res.send(err);
          // return a message
          res.json({ message: 'San Pham updated!' });
        });

      });
    })


    // delete 
    .delete(controller.delete);


  apiRouter.route('/:sanpham_id').put(upload.single('hinhsp'), function (req, res) {
    SanPham.findById(req.params.sanpham_id, function (err, sanpham) {
      if (err) res.send(err);

      if (req.file.path) sanpham.hinhsp = req.file.path;
      // save 
      sanpham.save(function (err) {
        if (err) res.send(err);
        // return a message
        res.json({ message: 'San Pham updated image!' });
      });

    });
  })


  apiRouter.route('/upload/:sanpham_id')

    // update 
    .put(upload.single('hinhsp'), function (req, res) {
      SanPham.findById(req.params.sanpham_id, function (err, sanpham) {

        if (err) res.send(err);

        // set the new information if it exists in the request
        if (req.body.tensp) sanpham.tensp = req.body.tensp;
        if (req.body.soluong) sanpham.soluong = req.body.soluong;
        if (req.body.giabd) sanpham.giabd = req.body.giabd;
        if (req.body.giaban) sanpham.giaban = req.body.giaban;
        if (req.body.ttkm) sanpham.ttkm = req.body.ttkm;
        if (req.file.path) sanpham.hinhsp = req.file.path;
        if (req.body.maloai) sanpham.maloai = req.body.maloai;

        // save 
        sanpham.save(function (err) {
          if (err) res.send(err);
          // return a message
          res.json({ message: 'San Pham upload!' });
        });

      });
    })
  return apiRouter;
};