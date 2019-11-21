var controller = require('../controllers/tinkm.controller');
var TinKM = require('../models/tinkm');

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

module.exports = function (app, express) {

    var apiRouter = express.Router();

    apiRouter.route('/')
        .post(upload.single('hinhanh'), (req, res) => {
            var tinkm = new TinKM();
            tinkm.tieude = req.body.tieude;
            tinkm.noidung = req.body.noidung;
            tinkm.hinhanh = req.file.path;

            tinkm.save(function (err) {
                if (err) {
                    // duplicate entry
                    if (err.code == 11000)
                        return res.json({ success: false, message: 'TinKM already exists. ' });
                    else
                        return res.send(err);
                } else {
                    return res.json({ message: 'Tin KM created!' });
                }
            });
        })
        .get(controller.getList);

    apiRouter.route('/:tinkm_id')
        .get(controller.getById)

        // update 
        .put(function (req, res) {
            TinKM.findById(req.params.tinkm_id, function (err, tinkm) {

                if (err) res.send(err);

                // set the new information if it exists in the request
                if (req.body.tieude) tinkm.tieude = req.body.tieude;
                if (req.body.noidung) tinkm.noidung = req.body.noidung;
                if (req.body.hinhanh) tinkm.hinhanh = req.body.hinhanh;

                // save 
                tinkm.save(function (err) {
                    if (err) res.send(err);
                    // return a message
                    res.json({ message: 'TinKM updated!' });
                });

            });
        })

        // delete 
        .delete(controller.delete);
    apiRouter.route('/upload/:tinkm_id')

        // update 
        .put(upload.single('hinhanh'), function (req, res) {
            TinKM.findById(req.params.tinkm_id, function (err, tinkm) {

                if (err) res.send(err);

                // set the new information if it exists in the request
                if (req.body.tieude) tinkm.tieude = req.body.tieude;
                if (req.body.noidung) tinkm.noidung = req.body.noidung;
                if (req.file.path) tinkm.hinhanh = req.file.path;

                // save 
                tinkm.save(function (err) {
                    if (err) res.send(err);
                    // return a message
                    res.json({ message: 'TinKM updated!' });
                });


            });
        })
    return apiRouter;
};