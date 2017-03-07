var express = require('express');
var router = express.Router();
var Website = require('../models/website');
var Content = require('../models/content');
var request = require('request');
var cheerio = require('cheerio');
var http = require('http');
var https = require('https');


router.get('/edit', function(req,res,next){
	Website.find({}, function(err, docs){
		console.log(docs);
		res.render('edit', {
			websites : docs,
			message : req.flash('msg'),
			error : req.flash('err'),
			count : docs.length,
			});
			
	});
	//req.flash('err', 'Database Server Error');
});

router.get('/edit/new', function(req,res,next){
	res.render('add', {
		header : "ADD NEW WEBSITE",
		button : "Add",
		title : "",
	    url : "",
	});
});

router.post('/edit/new', function(req,res){
	var title = req.body.title;
	var url = req.body.url;
	var b_category = req.body.category;
	var category = {
		name : b_category,
		class : "no value yet",
		id : "no value yet",
	}
	var website = new Website({
		title : title,
		url : url,
		category : category,
		}).save(function(err){
			if(!err){
				console.log("data saved");
				res.redirect("/websites/edit");
				req.flash('msg', 'website added');
			}else{
				console.log(err);
				req.flash('err', 'Database Server Error');
			}
		});
	
});

router.get('/edit/:id', function(req,res){
	var id = req.params.id;
	Website.findOne({'_id':id}, function(err, doc){
		if(err){
			
		}else {
		//console.log(doc);
		//res.body.url = doc.url;
		res.render('add',{
			header : "EDIT WEBSITE",
			button : "Update",
			title : doc.title,
			url : doc.url,
		});
		}
	});
	
	
	
});



router.post('/edit/:id',function(req,res){
	var id = req.params.id;
	var title = req.body.title;
	var url = req.body.url;
	var category = req.body.category;
	Website.findOne({'_id':id}, function(err, doc){
		if(err){
			console.log("error occured");
		}else {
		console.log(doc);
	    doc.title = title;
		doc.url = url;
		doc.category = category;
		//save DB
		doc.save(function(err,doc){
			console.log("data Updated");
			res.redirect("/websites/edit");
		});
		
		}
	
		
	
	
});


});


router.get('/delete/:id',function(req,res){
	var id = req.params.id;
	Website.remove({'_id':id}, function(err,doc){
		if(err){
			console.log("err Occured");
		}else{
			console.log("website deleted");
			res.redirect("/websites/edit");
		}
	});
});


router.get('/scrape/:id/', function(req,res){
	var id = req.params.id;
	var category = req.body.s_category;
	Website.findOne({'_id':id}, function(err, doc){
		if(err || doc == null){
			console.log("Error Occured");
		}else{
			console.log("Please wait.....");
			request(doc.url, function(err,response, html){
				if(!err){
					//console.log(html);
					//var $ = cheerio.load(html);
					
			console.log(cheerio.load(html)("img")[0]);		
				
					
				}
			});
			res.redirect("/");
		}
{
	
}		
	});
});



module.exports = router;