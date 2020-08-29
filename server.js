// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port,()=>{console.log(`server runing on port ${port}`)});

app.get('/',function(req,res){
    res.sendFile('website/index.html');
    })
app.get('/all',function(req,res){
    res.send(projectData);
});
app.post('/addWeather',addWeather);
function addWeather(req,res){
projectData.date = req.body.date;
projectData.felling = req.body.felling;
projectData.temp = req.body.main.temp;


}