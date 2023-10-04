const express = require('express');
const { engine } = require('express-handlebars');
var bodyParser = require('body-parser')
// const mysql = require('mysql')
const mysql = require('mysql2');


require('dotenv').config();

const app = express();
const PORT = 3000;

// parsing middleware
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

// templating engines
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');
 
// routing
const routes = require('./server/routes/user');
app.use('/', routes);


app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})
