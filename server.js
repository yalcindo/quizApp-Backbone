// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();
    //parses request body and populates request.body
    app.use( express.bodyParser() );
    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );
    //perform route lookup based on url and HTTP method
    app.use( app.router );
    //Where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );
    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
// Routes
 mongoose.connect("mongodb://localhost/createquiz");

 app.get( '/quiz', function( request, response ) {
    response.send( 'QUiz is running' );
});
var Question = new mongoose.Schema({
    questionName: String,
    number:Number
    
});

//Models
var QuestionModel = mongoose.model( 'Question', Question);

app.get( '/quiz/questions', function( request, response ) {
    return QuestionModel.find( function( err, questions ) {
        if( !err ) {
            return response.send( questions );
        } else {
            return console.log( err );
        }
    });
});
app.post( '/quiz/questions', function( request, response ) {
    var question = new QuestionModel({
        questionName: request.body.questionName,
        number: request.body.number,
       
    });
    question.save( function( err ) {
        if( !err ) {
            return console.log( 'created' );
        } else {
            return console.log( err );
        }
    });
    return response.send( question );
});
app.get( '/quiz/question/:id', function( request, response ) {
    return QuestionModel.findById( request.params.id, function( err, question ) {
        if( !err ) {
            return response.send( question );
        } else {
            return console.log( err );
        }
    });
});
//Update a book
app.put( '/quiz/questions/:id', function( request, response ) {
    console.log( 'Updating the question ' + request.body.questionName );
    return QuestionModel.findById( request.params.id, function( err, question ) {
        question.questionName = request.body.questionName;
        book.number = request.body.number;
    

        return question.save( function( err ) {
            if( !err ) {
                console.log( 'book updated' );
            } else {
                console.log( err );
            }
            return response.send(question);
        });
    });
});
//Delete a book
app.delete( '/quiz/questions/:id', function( request, response ) {
    console.log( 'Deleting book with id: ' + request.params.id );
    return QuestionModel.findById( request.params.id, function( err, question ) {
        return question.remove( function( err ) {
            if( !err ) {
                console.log( 'Question removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});



//Start server
var port =3001;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});