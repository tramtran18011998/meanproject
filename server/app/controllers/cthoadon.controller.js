var CTHoaDon       = require('../models/cthoadon');

module.exports.create =function(req, res) {           
    var cthoadon = new CTHoaDon();      
    cthoadon.mahd = req.body.mahd;  
    cthoadon.masp = req.body.masp;      
    cthoadon.soluong = req.body.soluong;  
    cthoadon.gia = req.body.gia;      
    cthoadon.thanhtien = req.body.thanhtien;  
    

    cthoadon.save(function(err) {
        if (err) {
            // duplicate entry
            if (err.code == 11000) 
                return res.json({ success: false, message: 'CTHoaDon already exists. '});
            else 
                return res.send(err);
        }

        // return a message
        res.json({  message: 'Created', success:true });
    });
};

module.exports.getList = function(req, res) {
    CTHoaDon.find(function(err, cthoadon) {
        if (err) res.send(err);

        res.json({  message: cthoadon, success:true });
    });
};

module.exports.getById = function(req, res) {
    CTHoaDon.findById(req.params.cthoadon_id, function(err, cthoadon) {
        if (err) res.send(err);             
        res.json({  message: cthoadon, success:true });
    });
};

module.exports.update =function(req, res) {
    CTHoaDon.findById(req.params.cthoadon_id, function(err, cthoadon) {

        if (err) res.send(err);

        // set the new information if it exists in the request
        if (req.body.mahd) cthoadon.mahd = req.body.mahd;
        if (req.body.masp) cthoadon.masp = req.body.masp;       
        if (req.body.soluong) cthoadon.soluong = req.body.soluong;       
        if (req.body.gia) cthoadon.gia = req.body.gia;
        if (req.body.thanhtien) cthoadon.thanhtien = req.body.thanhtien;
        

        // save 
        cthoadon.save(function(err) {
            if (err) res.send(err);
            res.json({  message: 'Da update', success:true });
        });

    });
};

module.exports.delete =function(req, res) {
    CTHoaDon.remove({
        _id: req.params.cthoadon_id
    }, function(err) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted',success:true });
    });
}