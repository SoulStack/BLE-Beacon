const express = require("express");
const cors = require('cors');
const mssql = require('mssql');

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
    const name = req.body.name;
    const dept = req.body.dept;
    const beacon_id = req.body.beacon_id;
    let query = `INSERT INTO patientDetails (patientName , tagId) VALUES ('${name}' , '${beacon_id}')`;
    let query_result = mssql.query(query, (err,result)=> {
        if(err){
            throw err
        } else {
            res.send(JSON.stringify("Patient Registered"))
        }
    })
})

app.get('/calendar-info' , (req , res) => {
    // console.log(req.body)
    let query = `SELECT COUNT(*) FROM reader`
    let query1 = `SELECT COUNT(*) FROM Assets`

    let query_result = mssql.query(query, (err,result) => {
        if(err){
            throw err
        } else {
            //  console.log(result)
            let query_result1 = mssql.query(query1 , (err1,result1) => {
                if(err1){
                    throw err1
                } else {
                    res.send(JSON.stringify([
                    {
                        total_patient:"13,456",
                        total_doctor:"1,000"
                    },{
                        total_asset:"38,456",
                        active_patient:"4,785",
                        active_doctors:"704"
                    } ]))
                }
            })
             
        }
    })
})

app.get('/beacon-info' , (req, res) => {
    // console.log(req.body)
    // console.log("beacon-info")
    let query = `SELECT COUNT(*) FROM reader`;
    let query_result = mssql.query(query, (err,result) => {
        if(err){
            throw err;
        } else {
            // console.log(result)
            res.send(JSON.stringify({
                total_beacon:650,
                active_beacon:650,
                active_reader:300,
                total_reader:300
            }))
        }
    })
})

app.get('/graph-info' , (req,res) => {
    // console.log(req.body)
    let query = `SELECT deptName FROM department`
    
    let query_result = mssql.query(query , (err, result) => {
        if(err){
            throw err
        } else {
            let deptName = [];
            for(i=0 ; i< result.recordset.length ; i++){
                // console.log(result.recordset[i].deptName)
                deptName.push(result.recordset[i].deptName)
            }
            // console.log(deptName)
            res.send(JSON.stringify(deptName))
        }
    })
})

app.post('/contactUs',(req,res)=> {
    console.log(req.body)
})

app.listen(port, ()=>{
    console.log('listening to port : ' + port);
}).on('error', (err)=>{
    console.log('Error occurred : ' + err.messsage);
})
