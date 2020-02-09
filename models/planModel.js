const mongoose = require("mongoose")

mongoose.connect(process.env.DB)
    .then(conn => {
        console.log("Plan DB connected")
        // console.log(conn)

    })

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name of the plan"]
    },
    rating: {
        type: Number,
        default: 5
    },
    averageRating: {
        type: Number,
        default: 5
    },
    description: {
        type: String,
        default: "this is a new plan"
    },
    preferences: {
        type: String,
        enum: ["vegan", "vegetarian", "eggitarian", "non-veg"]
    },
    price: {
        type: Number,
        default: 40
    },
    duration: {
        type: Number,
        default: 30
    },
    cover: {
        type: "String",
        required: true
    },
    picture: {
        type: [String],
        required: true
    }
})

const planModel = mongoose.model
    ("planModel", planSchema);

module.exports = planModel;