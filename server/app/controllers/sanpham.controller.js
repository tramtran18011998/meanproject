var SanPham = require('../models/sanpham');


// module.exports.create =function (req, res) {
//     var sanpham = new SanPham();
//     sanpham.tensp = req.body.tensp;
//     sanpham.soluong = req.body.soluong;
//     sanpham.giabd = req.body.giabd;
//     sanpham.giaban = req.body.giaban;
//     sanpham.ttkm = req.body.ttkm;
//     sanpham.hinhsp = req.body.hinhsp;
//     sanpham.maloai = req.body.maloai;

//     sanpham.save(function (err) {
//         if (err) {
//             // duplicate entry
//             if (err.code == 11000)
//                 return res.json({ success: false, message: 'San Pham already exists. ' });
//             else
//                 return res.send(err);
//         }

//         // return a message
//         res.json({ message: 'San Pham created!' });
//     });
// };

module.exports.getList = function (req, res) {
    SanPham.find(function (err, sanpham) {
        if (err) res.send(err);

        res.json({  message: sanpham, success:true });
        //res.json(sanpham);
    });
};
module.exports.getById = function (req, res) {
    SanPham.findById(req.params.sanpham_id, function (err, sanpham) {
        if (err) res.send(err);
        //res.json(sanpham);
        res.json({  message: sanpham, success:true });
    });
};
module.exports.getByMaloai = function (req, res) {
    // SanPham.find(req.params.sanpham_id, function(err, sanpham){
    //     if (err) res.send(err);
    //     res.json(sanpham);
    // })
    SanPham.findById(req.params.sanpham_id, function (err, sanpham) {
        if (err) res.send(err);
        res.json({  message: sanpham, success:true });
    });
};

// module.exports.update = function (req, res) {
//     SanPham.findById(req.params.sanpham_id, function (err, sanpham) {

//         if (err) res.send(err);

//         // set the new information if it exists in the request
//         if (req.body.tensp) sanpham.tensp = req.body.tensp;
//         if (req.body.soluong) sanpham.soluong = req.body.soluong;
//         if (req.body.giabd) sanpham.giabd = req.body.giabd;
//         if (req.body.giaban) sanpham.giaban = req.body.giaban;
//         if (req.body.ttkm) sanpham.ttkm = req.body.ttkm;
//         if (req.body.hinhsp) sanpham.hinhsp = req.body.hinhsp;
//         if (req.body.maloai) sanpham.maloai = req.body.maloai;

//         // save 
//         sanpham.save(function (err) {
//             if (err) res.send(err);
//             // return a message
//             res.json({ message: 'San Pham updated!' });
//         });

//     });
// };
module.exports.delete = function (req, res) {
    SanPham.remove({
        _id: req.params.sanpham_id
    }, function (err) {
        if (err) res.send(err);

        res.json({  message: "Delete!", success:true });
    });
}

// module.exports.paging = function (req, res, next) {
//     var perPage = 8; //sp moi trang
//     var page = req.params.page || 1;
//     SanPham.find({})
//         .skip((perPage * page) - perPage)
//         .limit(perPage)
//         .exec(function(err, sanphams){
//             SanPham.count().exec(function(err, count){
//                 console.log(sanphams);
//                 if(err) return next(err)
//                 else{
//                     res.json(sanphams);
//                 }
//             })
//         })
// }

module.exports.paging = function (req, res, next) {
    var perPage = 9; //sp moi trang
    var page = req.params.page || 1;
    
    SanPham.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, sanphams){
            SanPham.count().exec(function(err, count){
                //console.log(sanphams);
                if(err) return next(err)
                else{
                    res.json({message:sanphams,success:true});
                }
            })
        })
}