var login = document.querySelector(".login");
var signup = document.querySelector(".signUp");
var forgotPassword = document.querySelector(".forgotPassword");
var updateUser = document.querySelector(".updateUser");
const uploadPlanImages = document.querySelector(".uploadPlanImages");
const bookPlan = document.querySelector(".bookPlan");

var buttonPlan = document.getElementsByClassName(".paymentBtn");
var stripe = Stripe('pk_test_Z7541LtEM77fELquOJqGRWhg00quTjljZ3');

async function sendLogin(email, password) {
    const response = await axios.post("/users/login", {
        email,
        password
    })

    if (response.data.success) {
        location.assign("/");

    } else {
        alert("something went wrong");
    }

}

async function sendForgotPassword(email) {
    const response = await axios.post("/users/forgotPassword", {
        email
    })

    if (response.data.success) {
        alert(response.data.success)
    }

}

async function sendSignUp(username, email, password, confirmPassword) {
    const response = await axios.post("/users/signUp", {
        username,
        email,
        password,
        confirmPassword
    })

    console.log(response);

    if (response.data.success) {
        location.assign("/");
    } else {
        alert("something went wrong");
    }
}

// async function addFormdata(form) {
//     const button = document.querySelector(".updatebtn");
//     const id = button.getAttribute("planId")
//     console.log(form)
//     const response = await axios.patch(`/plans/${id}`, form);
//     if (response.data.success) {
//         alert("Plan Successfully uploaded")
//     }
// }


if (login != null) {
    login.addEventListener("submit", function (event) {
        event.preventDefault();
        var inputArray = document.getElementsByTagName("input");
        console.log(inputArray);
        const email = inputArray[0].value;
        const password = inputArray[1].value;
        console.log(email)
        sendLogin(email, password);

    })
}
if (signup != null) {
    signup.addEventListener("submit", function (event) {
        event.preventDefault();
        var inputArray = document.getElementsByTagName("input");
        console.log(inputArray)
        const username = inputArray[0].value;
        const email = inputArray[1].value;
        const password = inputArray[2].value;
        const confirmPassword = inputArray[3].value;

        sendSignUp(username, email, password, confirmPassword);
    })
}

if (forgotPassword != null) {
    forgotPassword.addEventListener("submit", function (event) {
        event.preventDefault();
        var inputArray = document.getElementsByTagName("input");
        console.log(inputArray)
        const email = inputArray[0].value;

        sendForgotPassword(email);

    })
}

// if (uploadPlanImages) {
//     uploadPlanImages.addEventListener("submit", function (e) {
//         e.preventDefault();
//         console.log("form in")
//         const form = new FormData();
//         const inputs = document.getElementsByTagName("input");
//         form.append("cover", inputs[0].files[0]);
//         for (var i = 1; i < inputs.length; i++) {
//             form.append("picture", inputs[i].files[0]);
//         }
//         console.log(form)
//         addFormdata(form)

//     })
// }

if (bookPlan) {
    // console.log(buttonPlan)
    bookPlan.addEventListener("click", async function (e) {
        e.preventDefault();
        // const id = req.params.id;
        // const plan = await planModel.find(id);
        // console.log(plan);
        // console.log(buttonPlan.getAttribute("planId"))
        // const id = buttonPlan.getAttribute("planId");
        // const response = await axios.get("/booking/:id")

        const id = bookPlan.getAttribute("planId");
        const response = await axios.get("/booking/"+id)
        console.log(response)
        const session = response.data.session;
        const userId = response.data.userId;
        console.log(session);
        console.log(session.id)

        stripe.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: session.id
          }).then(async function (result) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            
            // console.log(result)
            // if(result.error.messsage) {
            //     alert("Booking Failed");
            // }else {
            //     console.log("in")
            //     await axios.post("/booking/createNewBooking", {
            //         userId,
            //         id
            //     })
            //     if(result.data.success) {
            //         alert("Your booking has been confirmed");
            //         // location.assign("/")
            //     }
            // }
          });

    })
}
