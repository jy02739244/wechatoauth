
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
	var url = client.getAuthorizeURLForWebsite('http://oauth.carp.mopaasapp.com/callback','','snsapi_userinfo');
	console.log(url);
	res.redirect(url);  
});

app.get('/callback', function(req, res) {
	console.log('----weixin callback -----')
	var code = req.query.code;
	console.log('code:'+code);
	res.redirect('http://oauth.carp.mopaasapp.com/a.html');
});
var port = (process.env.PORT || 80);
app.listen(port);
console.log('start..');