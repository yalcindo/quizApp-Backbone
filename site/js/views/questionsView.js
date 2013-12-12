var app = app || {};
app.QuestionsView = Backbone.View.extend({
el:"#add-questions",
initialize: function(){
	console.log("hey");
	this.collection = new app.QuestionCollection();
	this.collection.fetch({reset: true});
	this.render();
	this.listenTo(this.collection, 'add', this.renderQuestion);
	this.listenTo( this.collection, 'reset', this.render );

 },
 events:{

 	"click #add":"addQuestion"
 },
 addQuestion :function(e){
 	e.preventDefault();
 	console.log("whattt?")
 	var data={};
 	var num=$("#num").val();
 	var question= $("#question").val();
 	console.log(num,question);
 	data["number"]=num;
 	data["questionName"]=question;
 	console.log("data",data)
 	this.collection.create( data);
 },
render: function(){
	this.collection.each(function(item){
    	this.renderQuestion(item);
	},this);
},
renderQuestion:function(item){
	var questionView = new app.QuestionView({
		model:item
	});

	this.$el.append(questionView.render().el);
}

});