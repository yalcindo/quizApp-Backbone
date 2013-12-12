var app = app || {};
app.QuestionView = Backbone.View.extend({
	tagName:"div",
	className:"show-questions",
	template:_.template($("#questionTemplate").html()),
	events:{
 	"click .delete":"deleteQuestion"
 	},
 	deleteQuestion:function(){
 		this.model.destroy();
 		this.remove();
 	},

	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		
        return this;
	}

});