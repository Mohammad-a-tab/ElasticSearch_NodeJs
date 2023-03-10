const { BlogController } = require("../controller/blog.controller");
const router = require("express").Router();

router.post("/create", BlogController.createNewBlog)
router.get("/list/:value?", BlogController.getAllBlogs)
router.get("/FindByTitle", BlogController.searchByTitle)
router.get("/multi-fields", BlogController.searchByMultiField)
router.get("/regexp", BlogController.searchByRegexp)
router.get("/regexp-multi", BlogController.searchByRegexpMultiField)
router.put("/update/:id", BlogController.updateBlog)
router.delete("/remove/:id", BlogController.removeBlog)


module.exports = {
    BlogRoutes : router
}