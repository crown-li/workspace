'use strict';

var
	fs = require('fs'),
	url = require('url'),
	path = require('path'),
	http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
//process.argv第一个元素是’node的执行文件的路径(node.exe| E:\nodejs\node.exe |)’，第二个元素是JavaScript文件的路径(file_server.js的路径| C:\Users\RYServer\Desktop\workspace\file_server.js |)。
var root = path.resolve(process.argv[2] || '.');
console.log('root:' + root);//C:\Users\RYServer\Desktop\workspace

//创建服务器：
var server = http.createServer(function (request, response) {
	//获取url的path，类似‘/css/bootstrap.css’,通过parse()将一个字符串解析为一个Url对象：
	var pathname = url.parse(request.url).pathname;//"/index.html"
	console.log('pathname:'+pathname);
	//获得对应的本地文件路径 '/srv/www/css/bootstrap.css'
	var filePath = path.join(root, pathname);//"C:\Users\RYServer\Desktop\workspace\index.html"
	console.log('filePath:'+filePath);
	//获取文件状态
	fs.stat(filePath, function (err, stats) {
		if (!err && stats.isFile()) {
			//没有出错并且文件存在
			console.log('200' + request.url);
			//发送200响应
			response.writeHead(200);
			//将文件导向response
			fs.createReadStream(filePath).pipe(response);
		} else {
			//直接在浏览器输入http://127.0.0.1:8080会打印404，因为浏览器识别这个地址是目录而不是文件
			//出错了或者文件不错在
			console.log('404' + request.url)
			//发送404响应
			response.writeHead(404);
			response.end('404 Not Found');
		}
	});

});
server.listen('8080');
console.log('Server is running at http://127.0.0.1:8080/index.html');
