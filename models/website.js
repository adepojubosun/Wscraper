var mongoose = require("../lib/db");
var Schema = mongoose.Schema;

var category = {
	name : String,
	class : String,
	id : String,
}


var websiteSchema = new Schema({
	url : String,
	title : String,
	category :  category,
	date_added : { type: Date, default: Date.now },
	
	
});

var Website = mongoose.model("Website", websiteSchema);

module.exports = Website; 