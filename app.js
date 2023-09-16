const express = require('express');
const path = require('path');

const app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });

const port = 80;

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    query:String
});

const contact = mongoose.model('contact', contactSchema);


// Express specific stuff
app.use('/static' , express.static('static'))
app.use(express.urlencoded())

//pug specific stuff
app.set('view engine' , 'pug')
app.set('views' , path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    const params= {}
    res.status(200).render('index.pug' , params);
})

app.get('/contact', (req, res) => {
    const params= {}
    res.status(200).render('contact.pug' , params);
})

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved successfully")
    }).catch(()=>{
        res.status(400).send("Item was not saved properly")
    });
    // res.status(200).render('contact.pug' );
})

app.listen(port,()=>{
    console.log(`the application started succesfully on port ${port}`);
});