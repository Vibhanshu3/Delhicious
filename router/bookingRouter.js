const express = require("express");
const bookingRouter = express.Router();
const { createCheckoutSession,
    createNewBooking,
} = require("../controller/bookingController")

const { 
    protectRoute,
} = require("../controller/authController")


bookingRouter.use(protectRoute);

bookingRouter
    .get("/:id", createCheckoutSession)

bookingRouter
    .post("/createnewbooking", createNewBooking)

module.exports = bookingRouter;