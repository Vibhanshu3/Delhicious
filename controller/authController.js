const userModel = require("../models/userModel");
const KEY = process.env.KEY;
const jwt = require("jsonwebtoken");
const Email = require("../Utilites/email")

module.exports.signUp = async function (req, res) {
    try {//1.create
        const user = await userModel.create(req.body);

        //payload
        const id = user["_id"]

        //create token
        const token = await jwt.sign({ id }, KEY);

        //sending token in cookie so that after another req it will be send with th res itself.
        res.cookie("jwt", token, { httpOnly: true });

        //send the token
        res.json({
            success: "user logged in"

        })

    } catch (err) {
        console.log(err)
        return res.json({
            err
        })
    }

}

module.exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        let dbPassword = user.password;
        console.log(user)
        if (dbPassword == password) {
            const id = user._id;
            const token = await jwt.sign({ id }, KEY);
            res.cookie("jwt", token, { httpOnly: true });
            // res.redirect("/");

            return res.json({
                // user,
                // token
                success: "user logged in",
            })
        } else {
            return res.json({
                success: "something went wrong"
            })
        }
    } catch (err) {
        console.log(err)

        return res.json({
            success: "something went wrong",
            err
        })
    }
}

module.exports.logout = function (req, res) {
    res.cookie("jwt", "randomtoken",
        {
            httpOnly: true,
            expires: new Date(Date.now())
        });

    res.redirect("/");
}


module.exports.isUserVerified = async function (req, res, next) {
    // const token= await jwt.verify(req.headers.authorization, KEY);
    // console.log(req.headers.authorization)
    try {
        console.log(req.cookies)
        if (req.cookies && req.cookies.jwt) {
            const token = req.cookies.jwt;
            const ans = await jwt.verify(token, KEY);
            if (ans) {
                //ans is user
                console.log(ans.id);
                const user = await userModel.findById(ans.id);
                req.user = user;
                next()
            } else {
                next();
            }
        } else {
            next();
        }
    } catch (err) {

        res.json({
            err
        })
    }
}

module.exports.protectRoute = async function (req, res, next) {
    // const token= await jwt.verify(req.headers.authorization, KEY);
    // console.log(req.headers.authorization)

    try {
        if (req.cookies && req.cookies.jwt) {
            // 2. Verfiy the token{
            const token = req.cookies.jwt;

            // try {
            //     if (req.headers.authorization) {
            //         const token = req.headers.authorization.split(" ")[1];
            const ans = await jwt.verify(token, KEY);

            //ans is id of user
            if (ans) {
                console.log(token)

                const user = userModel.findById(ans);
                req.user = user;
                next()
            } else {
                res.json({
                    data: "Your token is tempered"
                })
            }
        }
    } catch (err) {
        res.json({
            err
        })
    }
}

module.exports.forgetPassword = async function (req, res) {
    const { email } = req.body;

    try {
        //1.find user
        const user = await userModel.findOne({ email });

        //2.generate token
        const token = user.generateToken();

        //3.save token to the database
        await user.save({ validateBeforeSave: false })

        //4.create options for email
        const options = {
            from: '"On your request" <customecare@foodies.com>', // sender address
            to: email, // list of receivers
            subject: token, // Subject line
            text: token, // plain text body
            html: "<b>Hello world?</b>" // html body
        };

        await Email(options)
        res.json({
            // token,
            // user
            success: "New password link send"
        })

    } catch (err) {
        console.log(err)

        res.json({
            err
        })
    }
}

module.exports.resetPassword = async function (req, res) {
    try {
        const { password, confirmPassword, token } = req.body;

        if (token && password && confirmPassword) {
            const user = await userModel.findOne({ token })
            user.password = password;
            user.confirmPassword = confirmPassword;
            user.token = undefined;
            await user.save();

            res.json({
                data: "Your password has been updated"
            })
        } else {
            console.log("err")
            res.json({
                data: "Please enter the complete data"
            })
        }
    } catch (err) {
        console.log(err)

        res.json({
            err
        })
    }
}

module.exports.isAuthorized = function (arr) {

    return function (req, res, next) {
        var { role } = req.user;
        if (arr.includes(role) == true) {
            next()
        } else {
            res.json({
                data: "Access denied"

            })
        }
    }

}
