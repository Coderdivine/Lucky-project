const CustomError = require("./custom-error");
require("dotenv").config();
const s_key = process.env.STRIPE_S_KEY;
const s_endpoint = process.env.STRIPE_S_ENDPOINT || "your_stripe_endpoint_secret";
const stripe = require("stripe")(s_key);

class StripePayment {
  async createPaymentLink({amount, email}) {
    console.log({ email });
    let amount_in_dollars = amount / 1300;
    amount_in_dollars = amount_in_dollars * 100
    amount_in_dollars = Math.floor(amount_in_dollars);
    console.log({ amount_in_dollars });

    const paymentIntent = await stripe.paymentIntents.create({
      amount:amount_in_dollars,
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
    });
    console.log({ paymentIntent });
    if (!paymentIntent)
      throw new CustomError("Unable to create payment link.", 400);
    return paymentIntent;
  }

  async verifyPayment(paymentReference) {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentReference);
        if(!paymentIntent) throw new CustomError("Unable to verify payment", 400);
    
        if (paymentIntent.status === 'succeeded') {
          return {
            bool: true,
            paymentIntent
          }
        } else {
            return {
                bool: false,
                paymentIntent
              }
        }
    
  }

  async webHook(payload, sig) {
    // const payload = req.body;
    // const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        s_endpoint
      );
    } catch (err) {
      throw new CustomError("An error occyred, " + err.message,400);
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;

        const paymentRecord = await Payment.findOneAndUpdate(
          { paymentReference: paymentIntent.id },
          { status: paymentIntent.status },
          { new: true }
        );
        return paymentIntent;
        break;
      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object;
        break;
    }
  }
}

module.exports = new StripePayment();
