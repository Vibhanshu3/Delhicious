const express = require("express");
const userRouter = express.Router();
const multer = require("multer"); //middleware for form with anchor type puts docs in req.file from req.body. 
// var upload = multer({ dest: "uploads" });

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.filename + "-" + Date.now() + ".jpeg")
    }, destination: function (req, file, cb) {
        cb(null, "public")
    }
})

function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(null, false)
        cb(new Error("wrong file format"));
    }
}

var upload = multer({
    storage,
    fileFilter
})

const {
    getAllUser,
    addUser,
    getUser,
    updateUser,
    deleteUser,
    checkInput
} = require("../controller/userController");

const {
    signUp,
    login,
    forgetPassword,
    resetPassword,
    protectRoute
} = require("../controller/authController");

userRouter
    .route("")
    .get(getAllUser)
// .post(checkInput, addUser)

userRouter
    .route("/signUp")
    .post(signUp)

userRouter
    .route("/login")
    .post(login)

userRouter
    .route("/forgetPassword")
    .patch(forgetPassword)

userRouter
    .route("/resetPassword")
    .patch(resetPassword)

userRouter
    .route("/updateUser/:id")
    .post(upload.single("photo"), updateUser)

// userRouter
//     .route("/:id")
//     .get(getUser)
//     .patch(updateUser)
//     .delete(deleteUser)

module.exports = userRouter;