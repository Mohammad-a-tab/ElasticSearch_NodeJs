const { BlogController } = require("../controller/blog.controller");
const router = require("express").Router();

router.post("/create", BlogController.createNewBlog)

module.exports = {
    BlogRoutes : router
}