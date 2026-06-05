const {BookingService}=require('../services/index');
const {StatusCodes}=require('http-status-codes');
const bookingService=new BookingService();

const {createChannel,publishMessage}=require('../utils/messageQueue');
const {REMINDER_BINDING_KEY}=require('../config/serverConfig');
class BookingController{

    async sendMessageToQueue(req,res){

        const channel=await createChannel();
        const data={message:'Success'};
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
        return res.status(200).json({
            message:"Succesfully published the event"
        });
    }


    async createBooking(req,res){
        try {
        const response=await bookingService.createBooking(req.body);
        
        return res.status(StatusCodes.OK).json({
            data:response,
            message:'Succesfully completed the booking',
            success:true,
            err:{}
        })
    } catch (error) {
         return res.status(error.statusCode).json({
            data:{},
            message:error.message,
            success:false,
            err:error.explanation
        })
        }
    }
}


module.exports=BookingController


