const { IndicesRoutes } = require("./indices.routes");
const router = require("express").Router();

router.get("/", (req, res) => {
    return res.render("./pages/index", {
        message : "Hello Express"
    })
});

router.use("/index", IndicesRoutes)
module.exports = {
    AllRoutes : router
}