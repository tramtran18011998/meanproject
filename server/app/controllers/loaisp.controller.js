var LoaiSP       = require('../models/loaisp');
var SanPham       = require('../models/sanpham');

module.exports.create = function(req, res) {
            
    var loaisp = new LoaiSP();      
    loaisp.tenloaisp = req.body.tenloaisp;  

    loaisp.save(function(err) {
        if (err) {
            // duplicate entry
            if (err.code == 11000) 
                return res.json({ success: false, message: 'LoaiSP already exists. '});
            else 
                return res.send(err);
        }

        // return a message
        res.json({ message: 'Loaisp created!',success:true });
    });

};

module.exports.getList = function(req, res) {
    LoaiSP.find(function(err, loaisps) {
        if (err) res.send(err);

        res.json({ message: loaisps,success:true });
    });
};

module.exports.getById =function(req, res) {
    LoaiSP.findById(req.params.loaisp_id, function(err, loaisp) {
        if (err) res.send(err);

       
        res.json({ message: loaisp,success:true });
    });
};
module.exports.update = function(req, res) {
    LoaiSP.findById(req.params.loaisp_id, function(err, loaisp) {

        if (err) res.send(err);

        // set the new information if it exists in the request
        if (req.body.tenloaisp) loaisp.tenloaisp = req.body.tenloaisp;

        // save 
        loaisp.save(function(err) {
            if (err) res.send(err);

            // return a message
            
            res.json({ message: 'LoaiSP updated!',success:true });
        });

    });
};

module.exports.delete = function(req, res) {
    
    LoaiSP.remove({
        _id: req.params.loaisp_id,
        tenloaisp: req.params.loaisp_tenloaisp
    }, function(err, loaisp) {

        if (err) return res.json({success: false, message: err});
        
        SanPham.remove({
            maloai: req.params.loaisp_tenloaisp
        }, function(err, sp){
            if(err) return res.json({success: false, message: err});
            res.json({ message: 'Delete!',success:true });
        })
       
    });
}