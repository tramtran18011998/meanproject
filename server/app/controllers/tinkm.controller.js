var TinKM       = require('../models/tinkm');

// module.exports.create =function(req, res) {           
//     var tinkm = new TinKM();      
//     tinkm.tieude = req.body.tieude;  
//     tinkm.noidung = req.body.noidung;  
//     tinkm.hinhanh = req.body.hinhanh;    

//     tinkm.save(function(err) {
//         if (err) {
//             // duplicate entry
//             if (err.code == 11000) 
//                 return res.json({ success: false, message: 'TinKM already exists. '});
//             else 
//                 return res.send(err);
//         }

//         // return a message
//         res.json({ message: 'TinKM created!' });
//     });
// };

module.exports.getList = function(req, res) {
    TinKM.find(function(err, tinkm) {
        if (err) res.send(err);

        res.json(tinkm);
    });
};
module.exports.getById = function(req, res) {
    TinKM.findById(req.params.tinkm_id, function(err, tinkm) {
        if (err) res.send(err);             
        res.json(tinkm);
    });
};

// module.exports.update =function(req, res) {
//     TinKM.findById(req.params.tinkm_id, function(err, tinkm) {

//         if (err) res.send(err);

//         // set the new information if it exists in the request
//         if (req.body.tieude) tinkm.tieude = req.body.tieude;
//         if (req.body.noidung) tinkm.noidung = req.body.noidung;
//         if (req.body.hinhanh) tinkm.hinhanh = req.body.hinhanh;

//         // save 
//         tinkm.save(function(err) {
//             if (err) res.send(err);
//             // return a message
//             res.json({ message: 'TinKM updated!' });
//         });

//     });
// };
module.exports.delete =function(req, res) {
    TinKM.remove({
        _id: req.params.tinkm_id
    }, function(err) {
        if (err) res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}