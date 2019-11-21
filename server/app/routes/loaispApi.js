var LoaiSP       = require('../models/loaisp');
var controller = require('../controllers/loaisp.controller');


// var cors= require('cors');

// var originsWhitelist = [
//   'http://localhost:4200',      //this is my front-end url for development

// ];
// var corsOptions = {
//   origin: function(origin, callback){
//         var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
//         callback(null, isWhitelisted);
//   },
//   credentials:true
// }
// //here is the magic
// //app.use(cors(corsOptions));

module.exports = function(app, express) {

    var apiRouter = express.Router();
    //apiRouter.use(cors(corsOptions));

    
    apiRouter.route('/loaisp')

        .post(controller.create)

        .get(controller.getList);

    
    apiRouter.route('/loaisp/:loaisp_id')

        .get(controller.getById)

        // update 
        .put(controller.update)

        // delete 
        
        apiRouter.route('/loaisp/:loaisp_id/:loaisp_tenloaisp').delete(controller.delete);

    return apiRouter;
};
