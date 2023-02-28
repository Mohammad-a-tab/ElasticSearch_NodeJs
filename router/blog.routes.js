const { BlogController } = require("../controller/blog.controller");
const router = require("express").Router();

router.post("/create", BlogController.createNewBlog)
router.get("/list/:value?", BlogController.getAllBlogs)

module.exports = {
    BlogRoutes : router
}