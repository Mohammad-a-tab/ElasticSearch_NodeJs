const { BlogRoutes } = require("./blog.routes");
const { IndicesRoutes } = require("./indices.routes");
const router = require("express").Router();

router.get("/", (req, res) => {
    return res.render("./pages/index", {
        message : "Hello Express"
    })
});

router.use("/index", IndicesRoutes)
router.use("/blog", BlogRoutes)
module.exports = {
    AllRoutes : router
}