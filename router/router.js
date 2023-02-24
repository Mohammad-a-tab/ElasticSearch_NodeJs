const router = require("express").Router();

router.get("/", (req, res) => {
    return res.render("./pages/index", {
        message : "Hello Express"
    })
})

module.exports = {
    AllRoutes : router
}