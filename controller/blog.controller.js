const {StatusCodes : HttpStatus} = require("http-status-codes");
const { elasticClient } = require("../config/elastic.config");
const createHttpError = require("http-errors");
const indexBlog = "blog"
class BlogController {
    async getAllBlogs (req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async createNewBlog (req, res, next) {
        try {
            const {title, author, text} = req.body;
            const createResults = await elasticClient.index({
                index: indexBlog,
                document: {
                    title,
                    text,
                    author
                }
            });
            return res.status(HttpStatus.CREATED).json({
                StatusCode: HttpStatus.CREATED,
                data : {
                    createResults
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeBlog (req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async searchByTitle (req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async searchByMultiField (req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async searchByRegexp (req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    BlogController : new BlogController()
}