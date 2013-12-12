var app = app || {};
app.QuestionCollection = Backbone.Collection.extend({
	model:app.QuestionModel,
	 url: '/quiz/questions' 
});