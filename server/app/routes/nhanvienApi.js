var controller = require('../controllers/nhanvien.controller');

module.exports = function(app, express) {

    var apiRouter = express.Router();

    apiRouter.route('/')
        .post(controller.create)
        .get(controller.getList);

    apiRouter.route('/:nhanvien_id')
        .get(controller.getById)

        // update 
        .put(controller.update)

        // delete 
        // .delete(controller.delete);
        apiRouter.route('/:nhanvien_id/:nhanvien_tendn').delete(controller.delete);
    return apiRouter;
};
