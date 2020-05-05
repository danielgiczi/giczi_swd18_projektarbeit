const express = require("express")
const bodyParser = require("body-parser")
const port = 3000;
const path = require("path")
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');


const app = express()
const config = require('./webpack.config.js');
const compiler = webpack(config);


const hotMiddleware = webpackHotMiddleware(compiler);
app.use(hotMiddleware)

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

app.set('port', process.env.PORT || port)
app.use(bodyParser.json())

var publicDir = path.join(__dirname, 'public')

app.use("/public",express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(publicDir, 'index.html'))
})

app.listen(port, function(){
    console.log(`Listening on Port ${port}...`)
})