// const plans = require("../data/plans.json");
const planModel = require("../models/planModel")

module.exports.checkInput = function (req, res, next) {
    if (Object.keys(req.body).length == 0) {
        return res.json({
            data: "Please enter data in post request"
        })
    } else
        next();

}

module.exports.bestPlans = function(req, res, next) {
    
    req.query = {
        limit: 3,
        sort: "averageRating",
        price: {
            gt: 30
        }
    }
    console.log(req.query)
    next();
}

module.exports.getAllPlan = async function (req, res) {
    console.log(req.query)
    var oQuery = { ...req.query };

    
    var exarr = ["sort", "limit", "page", "select"];
    for (var i = 0; i < exarr.length; i++) {
        delete req.query[exarr[i]];

    }

    let str = JSON.stringify(req.query);
    str = str.replace(/gt|gte|lt|lte/g, function (match) {
        return "$" + match;

    })

    const data = JSON.parse(str);
    let plans =  planModel.find(data)
    
    if (oQuery.sort) {
        var sortedString = oQuery.sort.split("%").join(" ");
        console.log(sortedString)
        plans = plans.sort(sortedString);
    
    }

    if(oQuery.select) {
        var selectedString = oQuery.select.split("%").join(" ");
        console.log(selectedString)
        plans = plans.select(selectedString);

    }

    const page = Number(oQuery.page) || 1;
    const limit = Number(oQuery.limit) || 2;

    const toSkip = (page - 1) * limit;
    plans.skip(toSkip).limit(limit);

    const finalAnswer = await plans;

    res.json({
        finalAnswer
    });
}

module.exports.getPlan = async function (req, res) {
    const { id } = req.params;
    const Plan = await planModel.findById(id);
    res.json({
        Plan
    });
};

module.exports.addPlan = async function (req, res) {
    const plan = req.body;
    // plan.id = plans.length + 1;
    // plans.push(plan);
    // res.json({
    //     plans
    // });
    try {
        const newPlan = await planModel.create(plan);
        res.json({
            newPlan
        });

    } catch (err) {
        res.json({
            err
        });
    }
}

module.exports.deletePlan = async function (req, res) {
    const id = req.params.id;
    // var arr = [];
    // console.log(id);

    // var arr = plans.filter(function (plan) {
    //     return plan.id != id
    // })
    const deletedPlan = await planModel.findByIdAndDelete(id)

    res.json({
        deletedPlan
    });
}

module.exports.updatePlan = async function (req, res) {
    const { id } = req.params;
    const data = req.body;
    // const plan = plans[id - 1];
    // console.log(plan)
    // const keys = Object.keys(data);
    // console.log(id)
    // for (var i = 0; i < keys.length; i++) {
    //     plan[keys[i]] = data[keys[i]]
    // }

    // console.log(req.data)
    // console.log(req.files.cover);
    // console.log(req.files.picture);

    var cov = req.files.cover[0].filename;
    var pic = [];
    for(var i =0; i < req.files.picture.length;i++){
        pic.push(req.files.picture[i].filename)
    }
    req.body.cover = cov;
    req.body.picture = pic;

    const updatedPlan = await planModel.findByIdAndUpdate(id, req.body, { new: true })

    res.json({
        updatedPlan
    });
}
