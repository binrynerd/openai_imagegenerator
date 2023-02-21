require('dotenv').config();
const express = require('express');
const app = express();

// body parse
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// view engine 
app.set('view engine', 'ejs')
// static folder
app.use(express.static(__dirname + '/public'))



// routes
app.get('/', (req, res)=>{
    res.render('home')
})
app.use('/openai', require('./routes/apenAI'))


const port = process.env.port;
app.listen(port, console.log(`Server is up on ${port}`));