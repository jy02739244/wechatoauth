
var express = require('express');
var OAuth=require('wechat-oauth');
var config = require('config');

var app_id      = config.get('wx.app_id');
var app_secret  = config.get('wx.app_secret');

// 微信授权和回调
var client = new OAuth(app_id, app_secret);
// 主页,主要是负责OAuth认真
var app=express();
app.use(express.static('.'));
app.get('/', function(req, res) {
	var url = client.getAuthorizeURL('http://jy02739244-wechatoauth.daoapp.io/callback','','snsapi_userinfo');
	console.log(url);
	res.redirect(url);  
});

app.get('/callback', function(req, res) {
	console.log('----weixin callback -----')
	var code = req.query.code;
	console.log('code:'+code);
	client.getAccessToken(code, function (err, result) {
		if(err){
			console.log(err);
		}
		console.log(result)
		var accessToken = result.data.access_token;
		var openid = result.data.openid;
		client.getUser(openid, function (err, result) {
			console.log('use weixin api get user: '+ err)
			console.log(result)
			res.redirect('http://jy02739244-wechatoauth.daoapp.io/a.html');
		});
	});
	
});
var port = (process.env.PORT || 80);
app.listen(port);
console.log('start..');