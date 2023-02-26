const createHttpError = require("http-errors");
const { elasticClient } = require("../config/elastic.config");
const {StatusCodes : HttpStatus} = require("http-status-codes");
class IndicesController {
    async createNewIndex (req, res, next) {
        try {
            const {indexName} = req.body;
            if(!indexName) throw createHttpError.BadRequest("Invalid value of index name")
            const results = elasticClient.create({index : indexName});
            console.log(results);
            return res.status(HttpStatus.CREATED).json({
                statusCode : HttpStatus.CREATED,
                data : {
                    message : "Index is created-_-"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeIndex (req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async getIndices (req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}