const {StatusCodes : HttpStatus} = require("http-status-codes");
const { elasticClient } = require("../config/elastic.config");
const createHttpError = require("http-errors");
const indexBlog = "blog"
class BlogController {
    async getAllBlogs (req, res, next) {
        try {
            const value = req.params.value
            const blogs = await elasticClient.search({
                index : indexBlog,
                q: value
            });
            return res.status(HttpStatus.OK).json(blogs.hits.hits)
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
            const {id} = req.params;
            const deletedResult = await elasticClient.deleteByQuery({
                index : indexBlog,
                query : {
                    match : {
                        _id : id
                    }
                }
            });
            return res.status(HttpStatus.OK).json(deletedResult)
        } catch (error) {
            next(error)
        }
    }
    async updateDocument (req, res, next) {
        try {
            const {id} = req.params;
            const data = req.body;
            Object.keys(data).forEach(key => {
                if(!data[key]) delete data[key]
            });
            const updateResult = await elasticClient.update({
                index: indexBlog,
                id,
                doc: data
            })
            return res.status().json(updateResult)
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