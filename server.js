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

var distDir = path.join(__dirname, "dist")

app.use("/public",express.static('public'));

if (process.env.NODE_ENV != "development") { 
    app.get('/', function (req, res) {
        res.sendFile(path.join(distDir, 'index.html'))
    })

    app.get('/main.bundle.js', function (req, res) {
        res.sendFile(path.join(distDir, 'main.bundle.js'))
    })
}

const PORT = process.env.PORT ||3000
app.listen(PORT, function(){
    console.log(`Listening on Port ${PORT}...`)
})