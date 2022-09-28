const express = require("express");
const cors = require('cors');

const app = express();
const port = 3000

app.use(express.urlencoded({extended : false}));
app.use(
    cors({
        origin : '*',
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowHeaders : ['Content-Type']
    })
);
app.use(express.json())

app.post('/login',(req,res)=> {
    console.log(req.body)
    // res.sendStatus(200)
    res.send(JSON.stringify("All Good"))
})

app.post('/patient-register' , (req,res)=> {
    console.log(req.body)
})

app.post('/contactUs',(req,res)=> {
    console.log(req.body)
})

app.listen(port, ()=>{
    console.log('listening to port : ' + port);
}).on('error', (err)=>{
    console.log('Error occurred : ' + err.messsage);
})
