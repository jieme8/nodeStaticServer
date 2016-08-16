var http        = require('http'),
    express     = require('express'),
    compression = require('compression'),
    logger		= require('morgan'),
    routes 		= require('./routes'),
    app         = express(),
    server      = http.createServer(app),
    port        = 3333;
    url			= require("./url");


global.workDir = url.url;
app.use(compression());
app.use(logger("dev"));
app.get('*', express.static(workDir));
app.get("/??*",routes.html_static);


server.listen(port, function() {
	console.log("Running node on port : " + port);
});
