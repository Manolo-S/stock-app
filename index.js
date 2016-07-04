var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
app.use(express.static(path.join(__dirname, '/')));
var codesArr = ["GOOG"];

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.emit('initialize', codesArr);

	socket.on('disconnect', function(){
    	console.log('user disconnected');
  	});

  	socket.on('add_stock', function(stock){
  		console.log('server received add_stock', stock);
  		if (codesArr.indexOf(stock) === -1){
  			codesArr.push(stock);
	  		socket.broadcast.emit('add_stock', stock);
	  	}
  	});

  	socket.on('remove_stock', function(stock){
  		console.log('server received remove_stock', stock)
  		codesArr.splice(codesArr.indexOf(stock), 1);
  		socket.broadcast.emit('remove_stock', stock);
  	});
});

app.set('port', process.env.PORT || 3000);

http.listen(app.get('port'), function(){
  console.log('listening on: ', app.get('port'));
});


