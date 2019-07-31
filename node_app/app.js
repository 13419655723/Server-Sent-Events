var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//这条语句给所有的访问的req对象添加一个body属性，req.body是一个json对象，包含了post请求参数。
app.use(bodyParser.urlencoded({ extended: false }));

var mysql = require('mysql');  //导入mysql模块
 // 数据库配置连接参数
var connection = mysql.createConnection({  
    host: '127.0.0.1',  /*主机 http://127.0.0.1*/
    user: 'root',       //MySQL认证用户名
    password: '123456',
	port: '3306',          //端口号
    database: 'test'     //连接数据库名称
});
connection.connect();     //连接


app.get('/user/list', (req, res) => {
    console.log('有人访问！')
    connection.query("SELECT * FROM contact", function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);

            res.end(JSON.stringify(results));
        }
    })
});


app.post('/user/update', (req, res) => {
    console.log(req.body);
    connection.query("UPDATE contact SET QQ='" + req.body.QQ + "',TEL='" + req.body.TEL + "'  WHERE user_id='" + req.body.userId + "' ", function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            res.end(JSON.stringify(1));
        }
    })
})


app.post('/user/delete', (req, res) => {
    console.log("删除数据");
    connection.query("DELETE FROM contact WHERE user_id='" + req.body.userId + "' ", function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            res.end(JSON.stringify(1));
        }
    })
})

//生成32位长度的字母数字组合的随机字符串
function randomWord(randomFlag, min, max){
	var str = "",
		range = min,
		arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
	// 随机产生
	if(randomFlag){
		range = Math.round(Math.random() * (max-min)) + min;
	}
	for(var i=0; i<range; i++){
		pos = Math.round(Math.random() * (arr.length-1));
		str += arr[pos];
	}
	return str;
}

app.post('/user/add', (req, res, next) => {
	var userId = randomWord(false, 32);	
	connection.query("INSERT INTO contact (user_id,name,QQ,TEL) VALUES ('" + userId + "','" + req.body.name + "','" + req.body.QQ + "','" + req.body.TEL + "')", function (err, results) {
		if (err) {
			console.log(err);
		} else {
			console.log(results);
			res.end('1');
			
			//新增成功再执行服务器发送事件推送新增数据
			newUser = {
			  user_id: userId,
			  name: req.body.name,
			  QQ: req.body.QQ,
			  TEL: req.body.TEL
			};
		}
	})
})


//设置推送到前端的数据对象newUser
let newUser =null;
//执行服务器发送事件主动将新增数据推送到前端	
app.use('/user/sendNewUser', (req, res, next) => {
	  console.log("hello!进入发送事件路由！");
	  console.log(newUser);
	  //设置为服务器发送事件
	  res.setHeader('Content-Type', 'text/event-stream');
	  res.setHeader('Cache-Control', 'no-cache');
	  res.end("data:"+JSON.stringify(newUser)+"\n\n");
      //因为服务器发送事件是一个长连接一直给前端发送数据，发完就把发送对象清空为null
	  newUser=null;
})

app.post('/user/view', (req, res) => {
    console.log(req.body);
    connection.query("SELECT * FROM contact WHERE user_id='" + req.body.userId + "' ", function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            res.end(JSON.stringify(results));
        }
    })
});

app.post('/user/serach', (req, res) => {
    console.log(req.body);
    connection.query("SELECT * FROM contact WHERE name='" + req.body.name + "' ", function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
            res.end(JSON.stringify(results));
        }
    })
});

app.listen(8000, () => {
    console.log('服务器已启动！！！');
})
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});