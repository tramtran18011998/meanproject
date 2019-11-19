var KhachHang       = require('../models/khachhang');

module.exports.create =function(req, res) {           
    var khachhang = new KhachHang();      
    khachhang.idaccount = req.body.idaccount;  
    khachhang.hoten = req.body.hoten;      
    khachhang.diachi = req.body.diachi;  
    khachhang.email = req.body.email;  
    khachhang.sdt = req.body.sdt;  
    khachhang.tichluy = req.body.tichluy;  
    

    khachhang.save(function(err) {
        if (err) {
            // duplicate entry
            if (err.code == 11000) 
                return res.json({ success: false, message: 'KH already exists. '});
            else 
                return res.send(err);
        }
        else{
            return res.json({success:true, message: 'KH created!' });
        }

    });
};

module.exports.getList = function(req, res) {
    KhachHang.find(function(err, khachhang) {
        if (err) res.send(err);

        res.json(khachhang);
    });
};
module.exports.getById = function(req, res) {
    KhachHang.findById(req.params.khachhang_id, function(err, khachhang) {
        if (err) res.send(err);             
        res.json(khachhang);
    });
};

module.exports.update =function(req, res) {
    KhachHang.findById(req.params.khachhang_id, function(err, khachhang) {

        if (err) res.send(err);

        // set the new information if it exists in the request
        if (req.body.idaccount) khachhang.idaccount = req.body.idaccount;
        if (req.body.hoten) khachhang.hoten = req.body.hoten;       
        if (req.body.diachi) khachhang.diachi = req.body.diachi;
        if (req.body.email) khachhang.email = req.body.email;
        if (req.body.sdt) khachhang.sdt = req.body.sdt;
        if (req.body.tichluy) khachhang.tichluy = req.body.tichluy;

        // save 
        khachhang.save(function(err) {
            if (err) res.send(err);
            // return a message
            res.json({ message: 'KH updated!' });
        });

    });
};

module.exports.delete =function(req, res) {
    KhachHang.remove({
        _id: req.params.khachhang_id
    }, function(err) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
}