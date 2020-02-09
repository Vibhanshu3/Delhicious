const planModel = require("../models/planModel")

module.exports.getHomePage = async function (req, res) {
     // console.log(req.user);
     const user = req.user;
     const plans = await planModel.find().limit(3);
     // console.log(plans);
     res.render("home.pug", { title: "HomePage", plans, user })
}

module.exports.getAllPlans = async function (req, res) {
     const user = req.user;

     const plans = await planModel.find();
     // console.log(plans);
     res.render("plans.pug", { title: "Plans", plans, user })
}

module.exports.login = async function (req, res) {

     res.render("loginPage.pug", { title: "login" })
}

module.exports.signUp = async function (req, res) {
     res.render("signUpPage.pug", { title: "signUp" })
}

module.exports.userpage = async function (req, res) {
     const user = req.user;

     res.render("userPage.pug", { user })
}

module.exports.updateUser = async function (req, res) {
     const user = req.user;
     console.log(user);
     res.render("userUpdate.pug", { user })
}

module.exports.getPlansDetailsPage = async function (req, res) {
     const user = req.user;
     const id = req.params.id;
     const plan = await planModel.findById(id);
     res.render("planDetails", {user,plan})
   
   }