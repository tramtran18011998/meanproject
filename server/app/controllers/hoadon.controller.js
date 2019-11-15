var HoaDon       = require('../models/hoadon');

module.exports.create =function(req, res) {           
    var hoadon = new HoaDon();      
    hoadon.makh = req.body.makh;  
    hoadon.manv = req.body.manv;      
    hoadon.tongtien = req.body.tongtien;  
    //hoadon.ngaylap = req.body.ngaylap;  
    hoadon.ngaylap = Date.now();
    //hoadon.trangthai = req.body.trangthai;  
    hoadon.trangthai = false;  
    

    hoadon.save(function(err) {
        if (err) {
            // duplicate entry
            if (err.code == 11000) 
                return res.json({ success: false, message: 'HoaDon already exists. '});
            else 
                return res.send(err);
        }

        // return a message
        res.json({ message: 'Hoa Don created!' });
    });
};

module.exports.getList = function(req, res) {
    HoaDon.find(function(err, hoadon) {
        if (err) res.send(err);

        res.json(hoadon);
    });
};

module.exports.getById = function(req, res) {
    HoaDon.findById(req.params.hoadon_id, function(err, hoadon) {
        if (err) res.send(err);             
        res.json(hoadon);
    });
};

module.exports.update =function(req, res) {
    HoaDon.findById(req.params.hoadon_id, function(err, hoadon) {

        if (err) res.send(err);

        // set the new information if it exists in the request
        if (req.body.makh) hoadon.makh = req.body.makh;
        if (req.body.manv) hoadon.manv = req.body.manv;       
        if (req.body.tongtien) hoadon.tongtien = req.body.tongtien;
        //if (req.body.ngaylap) hoadon.ngaylap = req.body.ngaylap;
        if (req.body.trangthai) hoadon.trangthai = req.body.trangthai;
        

        // save 
        hoadon.save(function(err) {
            if (err) res.send(err);
            // return a message
            res.json({ message: 'Hoa Don updated!' });
        });

    });
};

module.exports.delete =function(req, res) {
    HoaDon.remove({
        _id: req.params.hoadon_id
    }, function(err) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
}