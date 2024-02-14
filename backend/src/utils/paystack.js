require("dotenv");
const crypto = require("crypto");
const axios = require("axios");
const CustomError = require("./custom-error");
const Payment = require("../models/payment.model");
const PUBLIC_KEY = process.env.PAYSTACK_P_KEY;
const SECRET_KEY = process.env.PAYSTACK_S_KEY;

const AxiosRequest = axios.create({
    baseURL: "https://api.paystack.co/",
    headers: {
    Authorization: `Bearer ${SECRET_KEY}`
    }
});

class PayStack {
    
    constructor(SECRET_KEY, PUBLIC_KEY) {
        this.Authorization = "Bearer " + SECRET_KEY;
        this.PUBLIC_KEY = PUBLIC_KEY;
    }

    async createPaymentLink(params) {
        const { email, amount } = params;
        if(!email) throw CustomError("Email is need to complete transaction.", 400);
        if(!amount || Number(amount) <= 10) throw new CustomError("Please input a valid amount.", 400);
        // channels: ['bank_transfer']
        const { data:createLink } = await AxiosRequest.post("/transaction/initialize",{ email, amount: Number(amount) * 100 });
        console.log({ createLink })
        if(!createLink && createLink?.status !== true) throw new CustomError("Unable to create payment link. try again later.", 400);
        return createLink?.data;
    }

    async verifyTransaction(ref) {
        if(!ref) throw new CustomError("Please provide reference number.", 400);
        const { data: verification_result } = await AxiosRequest.get(`/transaction/verify/${ref}`);
        if(!verification_result && verification_result?.status !== true) throw new CustomError("Unable to verify payment. try again later.", 400);
        const { status, reference } = verification_result?.data;
        if(status !== "success" || reference !== ref) throw new CustomError("Payment not successful.");
        return verification_result?.data;
    }

    async webHookVerification(req) {
        const hash = crypto.createHmac('sha512', process.env.WEBHOOK_SECRET_KEY).update(JSON.stringify(req.body)).digest('hex');
        if (hash !== req.headers['x-paystack-signature']) {
            throw new CustomError("Please you can't call this endpoint. IP address detected.", 400);
        }else{
            const { event, data:response, message } = req.body;
            const payments = Payment.findoOne({ reference: response?.reference || response?.transaction_reference });
            if(payments){
                payments.status = response?.status;
                await payments.save();
                console.log(
                    { payments }
                )
            }
            const eventMessage = this.detectTransactionEvent(event || response?.event || message);
            return eventMessage;
        } 
    }

    detectTransactionEvent(eventDescription) {
        const eventMapping = {
          'charge.dispute.create': 'A dispute was logged against your business',
          'charge.dispute.remind': 'A logged dispute has not been resolved',
          'charge.dispute.resolve': 'A dispute has been resolved',
          'charge.success': 'A successful charge was made',
          'customeridentification.failed': 'A customer ID validation has failed',
          'customeridentification.success': 'A customer ID validation was successful',
          'dedicatedaccount.assign.failed': 'This is sent when a DVA couldn\'t be created and assigned to a customer',
          'dedicatedaccount.assign.success': 'This is sent when a DVA has been successfully created and assigned to a customer',
          'invoice.create': 'An invoice has been created for a subscription on your account. This usually happens 3 days before the subscription is due or whenever we send the customer their first pending invoice notification',
          'invoice.payment_failed': 'A payment for an invoice failed',
          'invoice.update': 'An invoice has been updated. This usually means we were able to charge the customer successfully. You should inspect the invoice object returned and take necessary action',
          'paymentrequest.pending': 'A payment request has been sent to a customer',
          'paymentrequest.success': 'A payment request has been paid for',
          'refund.failed': 'Refund cannot be processed. Your account will be credited with refund amount',
          'refund.pending': 'Refund initiated, waiting for response from the processor.',
          'refund.processed': 'Refund has successfully been processed by the processor.',
          'refund.processing': 'Refund has been received by the processor.',
          'subscription.create': 'A subscription has been created',
          'subscription.disable': 'A subscription on your account has been disabled',
          'subscription.expiring_cards': 'Contains information on all subscriptions with cards that are expiring that month. Sent at the beginning of the month, to merchants using Subscriptions',
          'subscription.not_renew': 'A subscription on your account\'s status has changed to non-renewing. This means the subscription will not be charged on the next payment date',
          'transfer.failed': 'A transfer you attempted has failed',
          'transfer.success': 'A successful transfer has been completed',
          'transfer.reversed': 'A transfer you attempted has been reversed'
        };
      
        return eventMapping[eventDescription] || 'Unknown event description';
    } 
}

// new PayStack(SECRET_KEY, PUBLIC_KEY)
// .createPaymentLink({
//     email:"chimdi4332@gmail.com",
//     amount:500
// })
// .then(rs=>{
//     console.log(rs.data); 
// })
// .catch(error=>{
//     console.log(error)
// })

module.exports = new PayStack(SECRET_KEY, PUBLIC_KEY);