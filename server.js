const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()

if (process.env.NODE_ENV === "development") { 
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const config = require('./webpack.dev.config.js');
    const compiler = webpack(config);

    const hotMiddleware = webpackHotMiddleware(compiler);
    app.use(hotMiddleware)

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    }));
}

app.use(bodyParser.json())


app.use("/public",express.static('public'));

var prodDir = path.join(__dirname, "prod")

if (process.env.NODE_ENV != "development") { 
    app.get('/', function (req, res) {
        res.sendFile(path.join(prodDir, 'index.html'))
    })

    app.get('/main.bundle.js', function (req, res) {
        res.sendFile(path.join(prodDir, 'main.bundle.js'))
    })
}


app.use('/_framework', express.static("prod-csharp/_framework"));
app.get('/favicon.ico', function (req, res) {    
    res.end();
})

const PORT = process.env.PORT ||3000
app.listen(PORT, function(){
    console.log(`Listening on Port ${PORT}...`)
})