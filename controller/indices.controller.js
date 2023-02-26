const createHttpError = require("http-errors");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const { elasticClient } = require("../config/elastic.config");
class IndicesController {
    async createNewIndex (req, res, next) {
        try {
            const {indexName} = req.body;
            if(!indexName) throw createHttpError.BadRequest("Invalid value of index name");
            const results = await elasticClient.indices.create({index : indexName});
            return res.status(HttpStatus.CREATED).json({
                results,
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
            const {indexName} = req.body;
            if(!indexName) throw createHttpError.BadRequest("Invalid value of index name");
            await elasticClient.indices.delete({index : indexName});
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    message : "remove index is Successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getIndices (req, res, next) {
        try {
            const indices = await elasticClient.indices.getAlias()
            return res.status(HttpStatus.OK).json({
                indices : Object.keys(indices)
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    IndicesController : new IndicesController()
}