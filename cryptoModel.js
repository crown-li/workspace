'use strict';

const crypto = require('crypto');


//MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：
//如果要计算SHA1，只需要把'md5'改成'sha1'，就可以得到SHA1的结果1f32b9c9932c02227819a4151feed43e131aca40。
//还可以使用更安全的sha256和sha512。
const hash = crypto.createHash('md5');

//可任意多次调用update
//update()方法默认字符串编码为UTF-8，也可以传入Buffer。
hash.update('Hello,World!');
hash.update('Hello,World!');

//digest的值有三种：hex, latin1, base64,不填的话返回Buffer
console.log(hash.digest('hex'));



//Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥：
//只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法。
const hmac = crypto.createHmac('sha256', 'secrate-key');
hmac.update('Hello,World!');
hmac.update('Hello,World!');

console.log(hmac.digest('hex'));



//AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用：
//AES有很多不同的算法，如aes192，aes-128-ecb，aes-256-cbc等，
//AES除了密钥外还可以指定IV（Initial Vector），不同的系统只要IV不同，用相同的密钥加密相同的数据得到的加密结果也是不同的。
//加密结果通常有两种表示方法：hex和base64，这些功能Nodejs全部都支持，
//但是在应用中要注意，如果加解密双方一方用Nodejs，另一方用Java、PHP等其它语言，需要仔细测试。
//如果无法正确解密，要确认双方是否遵循同样的AES算法，字符串密钥和IV是否相同，加密后的数据是否统一为hex或base64格式。
function aesEncrypt(data, key) { //加密
	const cipher = crypto.createCipher('aes192', key);
	var crypted = cipher.update(data, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}

function aesDecrypt(encrypted, key) { //解密
	const decipher = crypto.createDecipher('aes192', key);
	var decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);