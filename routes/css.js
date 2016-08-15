var minify		= require("minify");
var initArrs	= require("./init");
var dxlCss 		= initArrs.dxlCss;
var fileArr = [];
var fileNum = 0;
var fileVal = "";

exports.index = function(req,res,dUrl){
	
	fileArr = [];
	fileNum = 0;
	fileVal = "";
	
	for(i=0;i<dxlCss.length;i++){		
		if(dxlCss[i].name == dUrl.file[0]){
			for(y=0; y<dxlCss[i].path.length;y++){
				fileArr.push(workDir + dxlCss[i].path[y]);
				console.log(workDir + dxlCss[i].path[y])
			}
		}
	}
	fileArr.push(workDir + dUrl.file[1] + "/css/" + dUrl.file[1] + ".css");
	fileArr.push(workDir + dUrl.file[1] + "/css/" + dUrl.file[2] + "/" + dUrl.file[3]);
	dxlFileArr(req,res);
}


function dxlFileArr(req,res){
	minify(fileArr[fileNum],function(e,d){
		fileNum++;
		fileVal += d;
		console.log(fileArr.length + "----" + fileNum);
		if((fileArr.length - 2) >= fileNum){
			dxlFileArr(req,res);
		}else{
	      	res.writeHead(200, {'Content-Type':'text/css;'});
			res.end(fileVal);
		}
	});
}
