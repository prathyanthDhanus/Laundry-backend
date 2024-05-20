

module.exports = {

    outForDeliveryStatusService:async(outForDelivery)=>{
        if(outForDelivery==true){
            return true
        }else{
            return false
        }
    }
}