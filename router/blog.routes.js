const { BlogController } = require("../controller/blog.controller");
const router = require("express").Router();

router.post("/create", BlogController.createNewBlog)
router.get("/list/:value?", BlogController.getAllBlogs)
router.get("/FindByTitle/:title", BlogController.searchByTitle)
router.put("/update/:id", BlogController.updateBlog)
router.delete("/remove/:id", BlogController.removeBlog)


module.exports = {
    BlogRoutes : router
}