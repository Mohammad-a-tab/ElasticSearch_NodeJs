const { BlogController } = require("../controller/blog.controller");
const router = require("express").Router();

router.post("/create", BlogController.createNewBlog)
router.get("/list/:value?", BlogController.getAllBlogs)
router.patch("/update", BlogController.updateDocument)
router.delete("/remove/:id", BlogController.removeBlog)


module.exports = {
    BlogRoutes : router
}