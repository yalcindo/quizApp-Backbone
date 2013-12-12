var app = app || {};

app.QuestionModel = Backbone.Model.extend({
	defaults:{
		questionName:"No name assigned",
		number:0

	},
	idAttribute : "_id"


});