var controller = require('../controllers/khachhang.controller');

module.exports = function(app, express) {

    var apiRouter = express.Router();

    apiRouter.route('/')
        .post(controller.create)
        .get(controller.getList);

    apiRouter.route('/:khachhang_id')
        .get(controller.getById)

        // update 
        .put(controller.update)

        // delete 
        .delete(controller.delete);
    return apiRouter;
};
