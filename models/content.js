var fs = require('fs');
var async = require('async');
var path = require('path');
var ROOT = __dirname +'/../data' ;

var content = function(name, category){
 	this.name = name;
	this.category = category;
	this.path = this._getPath();
}

content.prototype = {
	_getPath : function(){
		path.resolve(ROOT + '/' + this.name);
	},
	
	delete : function(){
		
	},
	
	getStats : function(callback){
	  	fs.stats(this.path, callback);
	},
	
	save : function(){
		
	},
	
	getfiles : function(path){
		
	}
}

module.exports = content;