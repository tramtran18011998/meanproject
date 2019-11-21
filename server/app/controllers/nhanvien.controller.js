var NhanVien       = require('../models/nhanvien');
var Account       = require('../models/account');

module.exports.create =function(req, res) {           
    var nhanvien = new NhanVien();      
    nhanvien.tendn = req.body.tendn;  
    nhanvien.hoten = req.body.hoten;  
    nhanvien.gioitinh = req.body.gioitinh;  
    nhanvien.diachi = req.body.diachi;  
    nhanvien.email = req.body.email;  
    nhanvien.sdt = req.body.sdt;  
    nhanvien.save(function(err) {
        if (err) {
            // duplicate entry
            if (err.code == 11000) 
                return res.json({ success: false, message: 'Nhan Vien already exists. '});
            else 
                return res.send(err);
        }
        else{
            return res.json({success:true, message: 'NV created!' });
        }
    });
};

module.exports.getList = function(req, res) {
    NhanVien.find(function(err, nhanvien) {
        if (err) res.send(err);

        res.json(nhanvien);
    });
};
module.exports.getById = function(req, res) {
    NhanVien.findById(req.params.nhanvien_id, function(err, nhanvien) {
        if (err) res.send(err);             
        res.json(nhanvien);
    });
};

module.exports.update =function(req, res) {
    NhanVien.findById(req.params.nhanvien_id, function(err, nhanvien) {

        if (err) res.send(err);

        // set the new information if it exists in the request
        if (req.body.tendn) nhanvien.tendn = req.body.tendn;
        if (req.body.hoten) nhanvien.hoten = req.body.hoten;
        if (req.body.gioitinh) nhanvien.gioitinh = req.body.gioitinh;
        if (req.body.diachi) nhanvien.diachi = req.body.diachi;
        if (req.body.email) nhanvien.email = req.body.email;
        if (req.body.sdt) nhanvien.sdt = req.body.sdt;


        // save 
        nhanvien.save(function(err) {
            if (err) res.send(err);
            // return a message
            res.json({ message: 'NV updated!' });
        });

    });
};
module.exports.delete =function(req, res) {
    NhanVien.remove({
        _id: req.params.nhanvien_id,
        tendn: req.params.nhanvien_tendn
    }, function(err, nhanvien) {
        if (err) return res.json({success: false, message: err});

        Account.remove({
            tendn: req.params.nhanvien_tendn
        }, function(err, sp){
            if(err) return res.json({success: false, message: err});
            res.json({ message: 'Successfully deleted' });
        })
       
    });
}