var minify = require('minify');
exports.index = function(req,res){
	var dUrl = {};
	dUrl.file = req.params[0].split("_");
	dUrl.type = dUrl.file[dUrl.file.length - 1].split(".")[1];
	//console.log(dUrl);
	if(dUrl.type == "js"){
		var js	= require("./js.js");
		js.index(req,res,dUrl);
	}

	if(dUrl.type == "css"){
		var css	= require("./css.js");
		css.index(req,res,dUrl);
	}
};

exports.html_static = function(req,res){
    console.log("---------------");
    var start = req.url.indexOf('??') + 2;
    console.log(start);
    var end = req.url.indexOf('?v', start);
    console.log(end);
    var fileArr;
    if(end == -1) {
        fileArr = req.url.substr(start).split(",");
    }else{
        fileArr = req.url.substr(start, end - start).split(",");
    }
console.log(fileArr);
    var fileCombined = '';
    (function comBineFIle(fileArr, index) {
        var i = index ? index : 0;
        var file = workDir + fileArr[i];
        minify(file, function(e, d) {
            if(!e) {
                fileCombined += d;
            }else{
                res.end(e.path + 'not found .');
                return;
            }
            if(i < fileArr.length - 1){
                comBineFIle(fileArr, i+1);
            }else{
                var contentType;
                if(/\.js/.test(file)){
                    contentType = 'application/javascript; ';
                } else if(/\.css/.test(file)) {
                    contentType = 'text/css; ';
                } else {
                    contentType = 'text/html; ';
                }
                res.writeHead(200, {'Content-Type': contentType + 'charset=UTF-8'});
                res.end(fileCombined);
                fileCombined = null;
            }
        });
    })(fileArr);
};
