const users = require("../data/users.json");
const userModel = require("../models/userModel");

module.exports.checkInput = function (req, res, next) {
    if (Object.keys(req.body).length == 0) {
        return res.json({
            data: "Please enter data in post request"
        })
    } else
        next();

}

module.exports.getAllUser = async function (req, res) {
    const users = await userModel.find()
    res.json({
        users
    });
}

module.exports.getUser = async function(req, res) {
    const { id}  = req.params;
    const user = await userModel.findById(id);
    res.json({
      user
    });
  };

module.exports.addUser = async function (req, res) {
    const user = req.body;

    const newUser = await userModel.create(user);
    res.json({
        newUser
    });
}

module.exports.updateUser = async function (req, res) {
    const {id } = req.params;
    // console.log(data)
    // const user = user[id - 1];
    // const keys = Object.keys(data);
    // for (var i = 0; i < keys.length; i++) {
    //     user[key[i]] = data[key[i]]
    // }
    // console.log(req.file);
    var photo = req.file.filename;
    req.body.photo = photo;

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    console.log(updatedUser)

    // alert('Your profile successfully updated')

    res.redirect("/userPage")
    // res.json({
    //     //
    // });
}

module.exports.deleteUser = async function (req, res) {
    const id = req.params.id;
    // var arr = users.filter(function (user) {
    //     return user.id != id
    // })
    var removedUser = await userModel.findByIdAndDelete(id)
    res.json({
        removedUser
    })


}
