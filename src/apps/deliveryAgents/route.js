const express = require("express");
const router = express.Router();
const tryCatch = require("../../utils/tryCatch");
const deliveryAgent = require("./controller");
const{tokenVerifyAdmin} = require("../../utils/jwtToken");
const {tokenVerifyDeliveryAgent} = require("../../utils/jwtToken");


router.post("/profile",tokenVerifyAdmin,tryCatch(deliveryAgent.addDeleiveryAgent))//delivery agent-creation by admin
router.get("/profiles",tokenVerifyAdmin,tryCatch(deliveryAgent.getDeliveryAgent))//get all delivery agents for admin
router.get("/profile",tryCatch(deliveryAgent.getDeliveryAgent));
router.put("/profile",tokenVerifyAdmin,tryCatch(deliveryAgent.updateDeliveryAgent));
router.delete("/profile",tokenVerifyAdmin,tryCatch(deliveryAgent.deleteDeliveryAgent));


router.post("/login",tryCatch(deliveryAgent.deliveryAgentLogin));
router.post("/verify-otp",tryCatch(deliveryAgent.deliveryAgentOtp_Verify));

router.post("/orders",tokenVerifyDeliveryAgent,tryCatch(deliveryAgent.checkPaymentIsDone));
router.put("/otp-verify/orders",tokenVerifyDeliveryAgent,tryCatch(deliveryAgent.updateIsCompletedField));
router.get("/orders",tokenVerifyDeliveryAgent,tryCatch(deliveryAgent.assignedOrdersDeliveryAgent));
router.put("/orders",tokenVerifyDeliveryAgent,tryCatch(deliveryAgent.updateIsPickedUp));














module.exports = router;