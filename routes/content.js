var express = require('express');
var router = express.Router();
var website = require("../models/website");
var content = require("../models/content");



router.get('/', function(req, res, next){

	
	
	res.render("content");
	
});












function getWebsiteUrl(){
	var websiteUrl = [];
	
	
	return websiteUrl;
}





module.exports = router;