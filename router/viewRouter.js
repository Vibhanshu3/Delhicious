const express = require("express");
const viewRouter = express.Router();

const {
    getHomePage,
    getAllPlans,
    login,
    signUp,
    userpage,
    updateUser,
    getPlansDetailsPage
} = require("../controller/viewController");

const {
    isUserVerified,
    logout
} = require("../controller/authController")

viewRouter.use(isUserVerified);


viewRouter
    .route("")
    .get(getHomePage)

viewRouter
    .route("/plans")
    .get(getAllPlans)

viewRouter
    .route("/login")
    .get(login)

viewRouter
    .route("/signUp")
    .get(signUp)

viewRouter
    .route("/logout")
    .get(logout)

viewRouter
    .route("/userpage")
    .get(userpage)

viewRouter
    .route("/updateuser")
    .get(updateUser)

viewRouter
    .route("/plans/:id")
    .get(getPlansDetailsPage)

module.exports = viewRouter;