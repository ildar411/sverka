const express = require('express');
const bodyParsser = require('body-parser');
var mysql = require('mysql');

const app = express();
var con = mysql.createPool({
	connectionLimit : 100,
	host : 'localhost',
	user : 'test',
	password : '1',
	database : 'veryfood_pc_cour',
	debug : true,
});

app.use(express.static(__dirname + '/static'));
app.use(bodyParsser.urlencoded({extended : false}));
app.use(bodyParsser.json());

app.post('/couriers', function(req, res){
	var name = req.body.name;
	var sum = req.body.sum;
	con.getConnection(function(err, conn) {
  		if (err) {
  			res.status(500);
  			res.json({
  				error: err.toString()
  			})
  			}
  		else {
  			conn.query(mysql.format('select id from couriers where name=?', [name]), function(err, rows){
  				if (err) {console.log('ошибка mysql');}
  				else 
  			    {
  			    	console.log('success');
  				};
  				var couriers_Id = rows.id;
  			
  				conn.query(mysql.format('insert into couriers_transfers (date, time, sum, couriers_id) values (curdate(), curtime(), ?, ?)',
  				[sum, rows.id]), function(err, data){
                	if (err) {console.log('ошибка mysql');}
  					else {console.log('success');};
  				
  					res.json({
		  				err: err,
		  				data: data,
		  				});
		  			conn.release();
  					}); 

  				});

		};
	});
});

app.get('/api2', function(req,res){
	var start = req.body.start;
	var end = req.body.end;
	con.getConnection(function(err, conn){
		if (err) {
  			res.status(500);
  			res.json({
  				error: err.toString()
  			})
  			}
  		else {
  			conn.query(mysql.format('select (date, time, sum, couriers_id) from couriers_transfers where (date > ?)and(date < ?)', [start, end]), function(err, rows){
  				if (err) {console.log('ошибка mysql');}
  				else {console.log('success');};
  				var couriers_id = rows.couriers_id;
  				var date = rows.date;
  				var time = rows.time;
  				var sum = rows.sum;
  				conn.query(mysql.format('select (name) from couriers where (id = ?)', [couriers_id]), function(err, rows){
  					if(err) {console.log('ошибка mysql');}
  					else {console.log('success');};
  							res.json({
		  						data : {sum : sum,
		  							date : date,
		  							time : time,
		  							name : rows.name}
		  					});
  					conn.release();
  				});
  				});

 };
});
});
app.get('/api1', function(req, res){
	con.getConnection(function(err, conn){
		if(err){
			res.status(500);
			res.json({
				error : err.toString()
			});
		}
		else {
			conn.query(mysql.format('select (name) from couriers'), function(err, rows){
				if (err) {console.log('ошибка mysql');}
				else {console.log('success');};
				res.json({
					name : rows
				});
				conn.release();	
			});
		};
		});
	})
app.listen(3000, function(err){
	if (err) throw console.log(err);
	console.log('start');
}); 

