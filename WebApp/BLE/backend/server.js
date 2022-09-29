const express = require("express");
const cors = require('cors');
const mssql = require('mssql');
const Msql = require("msql");

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

const sqlConfig = {
    server : '10.0.2.19',
    user : 'sa',
    password : 'Soulsvciot01',
    database : 'BEACON',
    options : {
        encrypt : false,
        trustServerCertificate : false
    }
}
mssql.connect(sqlConfig, (err, result)=>{
    if(err) throw err
    else{
        console.log('Connected to DB');
    }
})

app.post('/registration' , (req,res) => {
    
    let query = `INSERT INTO Users (userName, email, password) VALUES ('${req.body.name}','${req.body.email}','${req.body.password}')`;

    let query_result = mssql.query(query, (err, result) => {
        if(err){
            throw err;
        } else {
            //Data registered
            res.send(JSON.stringify('Credentials registered in database'));
        }
    })
})

app.post('/login',(req,res)=> {
    const email = req.body.email;
    const password = req.body.password;

    let query = `SELECT  email , password FROM Users WHERE email = '${email}' AND password = '${password}'`;
    // console.log(query);
    let query_result = mssql.query(query , (err, result) => {
        if(err){
            throw err;
        } else if(result.recordset.length > 0){
            res.send(JSON.stringify(200));
        } else {
            res.send(JSON.stringify("invalid credentials"));
        }
    })
    // res.sendStatus(200)
    // res.send(JSON.stringify("All Good"))
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
