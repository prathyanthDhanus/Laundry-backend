const {addOrderService} = require("../orderDetails/service/common");
const {getOrdersDb} = require("../orderDetails/service/db");

module.exports = {
    addOrder :async(req,res)=>{
        const {body} = req;
        const userId = req.user?.userId;
        const findOrders = await addOrderService(body,userId);

        return res.status(200).json({
            status: "success",
            message: "Order placed successfully",
            data: findOrders,
          });
    },

    getOrders : async(req,res)=>{
        const userId = req.user?.userId;
        const findOrders = await getOrdersDb(userId);

        return res.status(200).json({
            status: "success",
            message: "Orders fetched successfully",
            data: findOrders,
          });
    }

}