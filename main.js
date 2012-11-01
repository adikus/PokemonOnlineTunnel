// Load the TCP Library
net = require('net');

// Keep track of the chat clients
var clients = [];

// Start a TCP Server
net.createServer(function (socket) {
	
  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort;
 
  socket.client = net.connect({port: 5080, host:'188.165.249.120'},
    function() { //'connect' listener
	  console.log('Client connected.\n');
	});
  
  	socket.client.on('data', function(data) {
  		socket.write(data);
  		console.log('Data from server received.\n');
	});
  	
  	socket.client.on('end', function() {
	  console.log('Server disconnected.\n');
	  socket.end();
	});
  
  // Put this new client in the list
  clients.push(socket);

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    console.log('Data sent to server.\n');
    socket.client.write(data);
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    console.log(socket.name + " disconnected.\n");
    socket.client.end();
  });

}).listen(80);

// Put a friendly message on the terminal of the server.
console.log("Tunell server running at port 80\n");