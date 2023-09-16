var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('we are connected')
});

const kittySchema = new mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function speak() {
    const greeting = this.name
        ? 'Meow name is ' + this.name
        : 'I don\'t have a name';
    console.log(greeting);
};


const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({ name: 'Silence' });
// console.log(silence.name); // 'Silence'

// silence.speak();

// silence.save(function(err,silence){
//     if(err) return console.error(err);
//     silence.speak();
// })

silence.save();
silence.speak();
