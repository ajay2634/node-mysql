const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());


var mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password:'password',
	database:'employeedb',
	multipleStatements:true,
	insecureAuth : true
});

mysqlConnection.connect((err)=>{
if(!err)
	console.log('DB connection succeded.');
else
	console.log('DB connection failed \n Error :'+ JSON.stringify(err, undefined,2));
});

app.listen(3010,()=>console.log('Express server is running at port no : 30000'));

//Get all employee
app.get('/employees', (req,res)=>{
	mysqlConnection.query('SELECT * FROM employee',(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});

//Get all employee
app.get('/employees/:id', (req,res)=>{
	mysqlConnection.query('SELECT * FROM employee WHERE id=?',[req.params.id],(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});

//post employee
app.post('/employees', (req,res)=>{

	{id: req.params.id, name: req.params.name, empid: req.params.empid, salary: req.params.salary};
	var query = mysqlConnection.query('INSERT INTO posts SET ?', post, function(err, result) {
	// Neat! req.params.id
	if(!err)
			res.send('post successfully.');
		else
			console.log(err);
	});
	
});
