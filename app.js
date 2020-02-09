const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
var planRouter = require("./router/planRouter")
var userRouter = require("./router/userRouter")
var viewRouter = require("./router/viewRouter")
var bookingRouter = require("./router/bookingRouter")

const { createBooking } = require("../controller/bookingController")

app.post("/login", function (req, res) {
    console.log(req.body)

})

app.set("view engine", "pug"); // templating engine is pug.
app.set("views", "views");

app.use(bodyParser.raw({ type: 'application/json' }))
app.post("/webhook-checkout", createBooking)

app.use(express.json());

//static files (for exxample images etc).
app.use(express.static("public"))
app.use("/plans", express.static("public"))
app.use("/planImage", express.static("public"))


app.use(cookieParser());

//for quering using form action
app.use(express.urlencoded({ extended: true }))

// app.use("")
app.use("/", viewRouter)
app.use("/plans", planRouter);
app.use("/users", userRouter);
app.use("/booking", bookingRouter);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is listening at port 3000");

})