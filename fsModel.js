'use strict';

//process.nextTick()的函数不是立刻执行，而是要等到下一次事件循环。
process.nextTick(function() {
	console.log('nextTick callback');
});
console.log('nextTick was set!')



//Node.js进程本身的事件就由process对象来处理。如果我们响应exit事件，就可以在程序即将退出时执行某个回调函数
process.on('exit', function(code) {
	console.log('about to exit with code:' + code);
});



//根据浏览器和Node环境提供的全局变量名称来判断是什么环境
if (typeof(window) == 'undefined') {
	console.log('node.js')
} else {
	console.log('browser')
}



/*------------------------------------------读文件------------------------------------------*/
//Node.js内置的fs模块就是文件系统模块，负责读写文件。

//异步读取文件，且ajax.json必须在当前目录下，且文件编码为UTF—8
//当正常读取时，err参数为null，data参数为读取到的String
//当读取发生错误时，err参数代表一个错误对象，data为undefined
var fs = require('fs');
fs.readFile('data/ajax.json', 'utf-8', function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log(data);
		console.log('异步读取文件。');
	}
})



//异步读取二进制文件
//不传入文件编码时，回调函数的data参数将返回一个Buffer对象。
//Buffer对象就是一个包含零个或任意个字节的数组（注意和Array不同）
var fs2 = require('fs');
fs2.readFile('images/logo.png', function(err, data) {
	if (err) {
		console.log(err);
	} else {
		//Buffer对象可以和String作转换
		var text = data.toString('utf-8');
		console.log(text);
		console.log('异步读取二进制文件Buffer->String。');

		//或者把一个String转换成Buffer
		var bef = new Buffer(text, 'utf-8');
		console.log(bef);
		console.log('异步读取二进制文件String->Buffer。');
	}
})



//同步读取文件，同步读取的函数和异步函数相比，多了一个Sync后缀，并且不接收回调函数，函数直接返回结果。
var fs3 = require('fs');
var data = fs3.readFileSync('data/ajax.json', 'utf-8');
console.log(data);
console.log('同步读取文件。');



//如果同步读取文件发生错误，则需要用try...catch捕获该错误：
try {
	var fs4 = require('fs');
	var data = fs4.readFileSync('data/ajax.json', 'utf-8');
	console.log(data);
	console.log('同步读取文件用try...catch捕获该错误。');

} catch (err) {
	console.log(err);
}



/*------------------------------------------写文件------------------------------------------*/
//异步写文件
var fs = require('fs');
var data = '这是异步写文件';
fs.writeFile('data/ajaxwrite异步.txt', data, function(err) {
	if (err) {

	} else {
		console.log('异步写文件成功。');
	}
})



//同步写文件
var fs = require('fs');
var data = '这是同步写文件';
fs.writeFileSync('data/ajaxwrite同步.txt', data)



/*------------------------------------------获取文件信息------------------------------------------*/
var fs = require('fs');
fs.stat('data/ajax.json', function(err, stat) {
	if (err) {
		console.log(err);
	} else {
		//是否是文件
		console.log('isFile:' + stat.isFile());
		//是否是目录
		console.log('isDirectory:' + stat.isDirectory());
		if (stat.isFile()) {
			//文件大小
			console.log('size:' + stat.size);
			//创建时间 Data对象
			console.log('birth time:' + stat.birthtime);
			//修改时间，Data对象
			console.log('modified time:' + stat.mtime);
		}
	}
})

/*------------------------------------------流-stream------------------------------------------*/
//所有可以读取数据的流都继承自stream.Readable，所有可以写入的流都继承自stream.Writable。

//文件流读取文本内容
var fs =  require('fs');
//打开一个流
var rs = fs.createReadStream('data/ajax.json', 'utf-8');
//data事件表示流的数据已经可以读取了,要注意，data事件可能会有多次，每次传递的chunk是流的一部分数据。
rs.on('data', function(chuck) {
	console.log('DATA:');
	console.log(chuck);
})
//end事件表示这个流已经到末尾了,没有数据可以读取了
rs.on('end',function() {
	console.log('END');
})
//error事件表示出错了
rs.on('error',function(err) {
	console.log('ERROR:' + err);
})



//文件流写入文件
var fs = require('fs');

var rs = fs.createWriteStream('data/文件流Stream.txt', 'utf-8');
rs.write('使用Stream写入文本数据...\n');
rs.write('END.');
rs.end();

//写入二进制数据
var rs2 = fs.createWriteStream('data/文件流Stream二进制.txt');
rs2.write(new Buffer('使用Stream写入二进制数据...\n','utf-8'));
rs2.write(new Buffer('END.','utf-8'));
rs2.end();



//pipe-串联两个流
//一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe。
//Readable流有一个pipe()方法
//用pipe()把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序
var fs = require('fs');
var rs = fs.createReadStream('data/ajax.json');
var ws = fs.createWriteStream('data/pipe复制流.txt');
//默认情况下，当Readable流的数据读取完毕，end事件触发后，将自动关闭Writable流。如果我们不希望自动关闭Writable流，需要传入参数：
//readable.pipe(writable, { end: false });
rs.pipe(ws);

