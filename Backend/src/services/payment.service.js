import Razorpay from 'razorpay'
import { envVariables } from '../config/config.js'

const razorpay = new Razorpay({
    key_id: envVariables.RAZORPAY_KEY_ID,
    key_secret: envVariables.RAZORPAY_KEY_SECRET

})


export const createOrder = async ({ amount, currency }) => {
    const options = {
        amount: amount * 100, // amount in the smallest currency  unit 
        currency
    }
    const order = await razorpay.orders.create(options)
    return order
}
