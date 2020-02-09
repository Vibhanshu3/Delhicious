const mongoose = require("mongoose")
const configs = require("../configs/config")

//embedding
// author    booking
//
// refn.
//lly to for key

mongoose.connect(process.env.DB)
    .then(conn => {
        console.log("bookedPlanSchema DB connected")

    })

const bookedPlanSchema = mongoose.Schema({
    planId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: [true, "Please enter name of the plan"]
    },
    currentPrice: {
        type: Number,
        default: 40
    },
    bookedOn: {
        type: String,
        default: Date.now()
    }
})

const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    bookedPlans: {
        type: [bookedPlanSchema],
        required: true
    }
})

const BookingModel = mongoose.model
    ("bookingModel", bookingSchema);

module.exports = BookingModel;


