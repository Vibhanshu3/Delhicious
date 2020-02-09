const mongoose = require("mongoose")
const validator = require("validator")
const crypto = require("crypto");

mongoose.connect(process.env.DB)
    .then(conn => {
        console.log("User DB connected")

    })

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter name of the user"],
        required: true

    },
    email: {
        type: String,
        unique: true,
        validate: validator.isEmail,
        required: true

    },
    password: {
        type: String,
        minlength: 8,
        required: true

    },
    confirmPassword: {
        type: String,
        minlength: 8,
        validate: function() {
            return this.password == this.confirmPassword;

        },
        required: true

    },
    
    phoneNumber: {
        type: Number,

    },
    role: {
        type: String,
        enum: ["admin", "restaurant Owner", "user"],
        default: "user"

    },
    token: String,

    photo: {
        type:String,
        default: "default.jpg"
    },

    userBookedPlansId: {
        type: String
    }
})

userSchema.pre("save", function () {

    this.confirmPassword == undefined;
})

userSchema.method("generateToken", function () {
    this.token = crypto.randomBytes(32).toString("hex");
    const Token = this.token
    return Token;

})

const userModel = mongoose.model
    ("userModel", userSchema);

module.exports = userModel;