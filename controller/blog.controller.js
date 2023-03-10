const {StatusCodes : HttpStatus} = require("http-status-codes");
const { elasticClient } = require("../config/elastic.config");
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
    async updateBlog (req, res, next) {
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
            return res.status(HttpStatus.OK).json(updateResult)
        } catch (error) {
            next(error)
        }
    }
    async searchByTitle (req, res, next) {
        try {
            const {title} = req.query;
            const result = await elasticClient.search({
                index: indexBlog,
                query: {
                    match: {
                        title
                    }
                }
            });
            return res.status(HttpStatus.OK).json(result.hits.hits)
        } catch (error) {
            next(error)
        }
    }
    async searchByMultiField (req, res, next) {
        try {
            const {search} = req.query;
            const result = await elasticClient.search({
                index: indexBlog,
                query: {
                    multi_match: {
                        query: search,
                        fields: ["title", "text", "author"]
                    }
                }
            });
            return res.status(HttpStatus.OK).json(result.hits.hits)
        } catch (error) {
            next(error)
        }
    }
    async searchByRegexp (req, res, next) {
        try {
            const {search} = req.query;
            const result = await elasticClient.search({
                index: indexBlog,
                query: {
                    regexp: {
                        title: `.*${search}.*`
                    }
                }
            });
            return res.status(HttpStatus.OK).json(result.hits.hits)
        } catch (error) {
            next(error)
        }
    }
    async searchByRegexpMultiField(req, res, next) {
        const {search} = req.query;
        const result = await elasticClient.search({
            index: indexBlog,
            query: {
                bool: {
                    should: [
                        {
                            regexp: {title: `.*${search}.*`}
                        },
                        {
                            regexp: {text: `.*${search}.*`}
                        },
                        {
                            regexp: {author: `.*${search}.*`}
                        }
                    ]
                }
            }
        });
        return res.status(HttpStatus.OK).json(result.hits.hits)
    }
}
module.exports = {
    BlogController : new BlogController()
}