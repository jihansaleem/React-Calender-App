const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    password : 'postgres',
    database : 'calendar_app',
    charset  : 'utf8'
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const bookshelf = require('bookshelf')(knex);

const Event = bookshelf.Model.extend({
    tableName: 'events', 
    note: function() {
        return this.hasMany(Note)
    }
})

const Note = bookshelf.Model.extend({
    tableName: 'notes',
    event: function() {
        return this.belongsTo(Event)
    }
})

//to get all events.
app.get('/events',(req,res)=>{
    Event 
        .fetchAll()
        .then(events=>{
           res.json(events.models.map(event => event.attributes)) 
        })

});
//to read all notes.
app.get('/notes',(req,res)=>{
    Note 
        .fetchAll()
        .then(notes=>{
           res.json(notes.models.map(note => note.attributes)) 
        })

});

// to add new event.
 app.post('/new_event',(req,res)=>{
    const newEvent = new Event({
       from:'8AM', to:'3PM',title:'PA Day',type:'School',location:'Chris Hadfield PS' 
    })
    newEvent.save()
    .then(event =>{
        res.send(event);
        })   
 });

 //to edit an event.
 app.put('/edit_event',(req,res)=>{
    
    const newContent = {
    title:'Volley training'
}
new Event({id: 3})
    .save(newContent, {patch: true})
    .then(event => {
           res.send(event);
    })
});


app.use(express.static(__dirname + './calendar-front/build'));
const PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
	console.log("Listening on Port:%s",PORT)
	console.log("Stop with Ctrl+C");
});


// app.listen(8080, () => {
// 	console.log('Server Started!');
// });
