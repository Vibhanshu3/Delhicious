const planModel = require("../models/planModel");
const SK = process.env.SK;
const stripe = require('stripe')(SK);
const userModel = require("../models/userModel");
const bookingModel = require("../models/bookingModel");
const END_POINT_SECRET = process.env.END_POINT_SECRET;

module.exports.createCheckoutSession = async function (req, res) {

    //id
    //plan model pe req by id
    const id = req.params.id;
    const plan = await planModel.findOne({ _id: id });
    console.log(plan);
    const user = req.user;
    const userId = user["_id"];

    //create session npm install stripe
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: user.email,
        line_items: [{
            name: plan.name,
            description: plan.description,
            amount: plan.price * 100,
            currency: 'usd',
            quantity: 1,
        }],
        success_url: `${req.protocol}://${req.get("host")}/userPage`,
        cancel_url: `${req.protocol}://${req.get("host")}/login`,
    });

    res.json({
        session,
        userId
    })
}

module.exports.createNewBooking = async function (email, planName) {

    const user = await userModel.findOne({ email: email });
    const plan = await planModel.findOne({ name: planName });
    const planId = req.body.planId;
    const userId = req.body.userId;
    
    if (user.userBookedPlansId == undefined) {
        //create bookingOrder
        const order = {
            userId: userId,
            bookedPlans: {
                planId: planId,
                name: plan.name,
                currentPrice: plan.price
            }
        }
        const newOrder = await bookingModel.create(order);
        await user.save({ validateBeforeSave: false });
        return res.json({ newOrder, success: " New plan added" })

    } else {
        const order = {
            bookedPlans: {
                planId: planId,
                name: plan.name,
                currentPrice: plan.price
            }
        }

        const oldOrder = await bookingModel.findById(user.userBookedPlansId);
        oldOrder.bookedPlan.push(order);
        const newBooking = await bookingModel.findByIdAndUpdate(
            oldOrder["_id"], oldOrder, { new: true }
        )
        return res.json({ newBooking, success: " New plan added" })

    }//"5e19d2ecf170ec2b648be38f"

}

module.exports.createBooking = async function (req, res) {
    const sig = req.headers['stripe-signature'];
    let event;
    const endpointSecret = END_POINT_SECRET;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

        if (event.type == "payment_intent_succeeded") {
            const userEmail = event.data.object.customer_email;
            const planName = event.data.object.line_items[0].name;

            await this.createNewBooking(userEmail, planName);

            resizeTo.json({
                received: true
            })
        }
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`)
    }
}