const express = require("express");
const planRouter = express.Router();
const multer = require("multer");

const {
    getAllPlan,
    addPlan,
    deletePlan,
    updatePlan,
    checkInput,
    getPlan,
    bestPlans
} = require("../controller/planController");

const {
    protectRoute,
    isAuthorized
} = require("../controller/authController")

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpeg")
    }, destination: function (req, file, cb) {
        cb(null, 'public');
    }
})

const fileFilter = function (req, file, cb) {
    try {
        if (file.mimetype.startsWith("image")) {
            cb(null, true)
        } else {
            // cb(null, false);
            cb(new Error("Wrong file format"))
        }
    }
    catch (err) {
        console.log(err);
    }
}
var upload = multer({
    storage: storage,
    fileFilter
})

planRouter
    .route("")
    .get(protectRoute, getAllPlan)
    .post(checkInput, addPlan)

planRouter
    .route("/best-5-plans")
    .get(bestPlans, getAllPlan)

planRouter
    .route("/:id")
    .get(getPlan)
    // .post(upload.fields([{
    //     name: "cover", maxCount: 1
    //     }, {
    //     name: "picture", maxCount: 3
    // }]), updatePlan)
    .delete(protectRoute, isAuthorized(["admin"]), deletePlan)

planRouter
    .route("/planImage/:id") 
    .post(upload.fields([{
        name: "cover", maxCount: 1
        }, {
        name: "picture", maxCount: 3
    }]), updatePlan)


module.exports = planRouter;