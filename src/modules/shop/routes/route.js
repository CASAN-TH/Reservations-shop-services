'use strict';
var controller = require('../controllers/controller'),
    policy = require('../policy/policy');
module.exports = function (app) {
    var url = '/api/shops';
    var urlWithParam = '/api/shops/:shopId';
    app.route(url).all(policy.isAllowed)
        .get(controller.getList)
        .post(controller.create);

    app.route(urlWithParam).all(policy.isAllowed)
        .get(controller.read)
        .put(controller.update)
        .delete(controller.delete);

    app.route('/api/shoplist')
        .get(controller.getShopList)
    app.route('/api/shops-me/:id')
        .get(
            controller.returnData
        ),

        app.route('/api/shoplist/:shopId')
            .get(controller.read)
    app.param('shopId', controller.getByID, controller.getShopByID);
    app.param('id', controller.findUserById)
}