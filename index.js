var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
app.use(express.static(path.join(__dirname, '/')));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('disconnect', function(){
    	console.log('user disconnected');
  	});

  	socket.on('add_stock', function(stock){
  		console.log('server received add_stock', stock)
  		socket.broadcast.emit('add_stock', stock);
  	});

  	socket.on('remove_stock', function(stock){
  		console.log('server received remove_stock', stock)
  		socket.broadcast.emit('remove_stock', stock);
  	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


