'use strict';

//导入http模块
var http = require('http');

//创建http server，并传入回调函数
var server = http.createServer(function(request,response) {
	//回调函数接收request和response对象
	//获取http的，method和url；
	console.log(request.method + ':' + request.url);
	//将HTTP响应200写入respons，同时设置content-type：text/html；
	response.writeHead(200, {'content-type':'text/html'});
	//将HTTP响应的HTML写入response；
	response.end('<h1>Hello, world!</h1>');
});

//让服务器监听8080端口
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080');



//继续扩展一下上面的Web程序。我们可以设定一个目录，然后让Web程序变成一个文件服务器。要实现这一点，我们只需要解析request.url中的路径，然后在本地找到对应的文件，把文件内容发送出去就可以了
//解析URL需要用到Node.js提供的url模块，它使用起来非常简单，通过parse()将一个字符串解析为一个Url对象：
var url = require('url');
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));



//处理本地文件目录需要使用Node.js提供的path模块，它可以方便地构造目录：
var path = require('path');
// 解析当前目录
var workDir = path.resolve('.');// 'C:\Users\RYServer\Desktop\workspace'
// 组合完整的文件路径:当前目录+'pub'+'index.html'
var filePath = path.join(workDir,'pub','index.html');//C:\Users\RYServer\Desktop\workspace\pub\index.html
console.log(filePath)