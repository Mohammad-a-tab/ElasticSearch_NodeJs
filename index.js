const ExpressEjsLayouts = require("express-ejs-layouts");
const { AllRoutes } = require("./router/router");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
require("dotenv").config()
const {PORT} = process.env;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(ExpressEjsLayouts);
app.set("views", "views");
app.set("layout", "./layouts/master");
app.use(AllRoutes)
app.use((req, res, next) => {
    return res.status(404).json({
        statusCode : 404,
        message : "Not Found"
    })
});
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        data : null,
        errors : [
            statusCode = err.status || 500,
            message = err.message
        ]
    })
});

server.listen(PORT, () => {
    console.log(`run > http://localhost:${PORT}`);
})
