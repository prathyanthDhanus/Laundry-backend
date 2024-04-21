const {addOrderService} = require("../orderDetails/service/common");
// const {orderExisting} = require("../orderDetails/service/db");

module.exports = {
    addOrder :async(req,res)=>{
        const {body} = req;
        const userId = req.user?.userId;
        const orders = await addOrderService(body,userId);

        return res.status(200).json({
            status: "success",
            message: "Order placed successfully",
            data: orders,
          });
    },
    
}