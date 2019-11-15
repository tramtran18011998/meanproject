var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var HoaDonSchema =new Schema({   
    
    makh:{type:String},
    manv:{type:String},
    tongtien:{type:Number},
    ngaylap:{type:Date},
    trangthai:{type:Boolean},

});


module.exports=mongoose.model('HoaDon',HoaDonSchema);