var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var SanPhamSchema =new Schema({   
    
    tensp:{type:String},
    soluong:{type:Number},
    giabd:{type:Number},
    giaban:{type:Number},
    ttkm:{type:Number},
    hinhsp:{type:String},
    maloai:{type:String},
});


module.exports=mongoose.model('SanPham',SanPhamSchema);