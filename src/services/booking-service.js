
const {BookingRepository}=require('../repository/index');
const { ServiceError } = require('../utils/errors');
const bookingRepository=new BookingRepository();
class BookingService{

    async createBooking(data){

        try {
            const booking =await bookingRepository(data);
            return booking;
        } catch (error) {
            if(error.name=='SequelizeValidatioError'){
                throw error;
            }
            throw new ServiceError(error);
           
        }
    }
}
module.exports=BookingService;