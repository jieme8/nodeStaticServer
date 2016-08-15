var minify		= require("minify");
var initArrs	= require("./init");
var dxlJs 		= initArrs.dxlJs;
var fileArr = [];
var fileNum = 0;
var fileVal = "";

exports.index = function(req,res,dUrl){
	//console.log(dUrl);
	fileVal = "";
	fileArr = [];
	fileNum = 0;

	for(i=0;i<dxlJs.length;i++){		
		if(dxlJs[i].name == dUrl.file[0]){
			for(y=0; y<dxlJs[i].path.length;y++){
				fileArr.push(workDir + dxlJs[i].path[y]);
				//console.log(workDir + dxlJs[i].path[y])
			}
		}
	}

	fileArr.push(workDir + dUrl.file[1] + "/js/" + dUrl.file[1] + ".js");
	fileArr.push(workDir + dUrl.file[1] + "/js/" + dUrl.file[2] + "/" + dUrl.file[3]);
	//console.log(fileArr)
	dxlFileArr(req,res);
}




function dxlFileArr(req,res){
	minify(fileArr[fileNum],function(e,d){
		fileNum++;
		fileVal += d;
		//console.log(fileArr.length + "----" + fileNum);
		if((fileArr.length - 2) >= fileNum){
			dxlFileArr(req,res);
		}else{
	      	res.writeHead(200, {'Content-Type':'application/javascript'});
			res.end(fileVal);
		}
	});
}
	