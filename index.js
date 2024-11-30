const WebSocket = require( "ws" )

// Create a WebSocket server
const wss = new WebSocket.Server( { port: 8080 } )

console.log( "WebSocket server is running on port 8080" )

// When a new client connects
wss.on( "connection", ws => {

	console.log( "A new client connected!" )

	// When the server receives a message from the client
	ws.on( "message", message => {

		console.log( `Received message: ${ message }` )

		// Send a response back to the client
		ws.send( `Message received: ${ message }` )
	} )

	// When the client disconnects
	ws.on( "close", () => {

		console.log( "A client disconnected." )
	} )

	// Send a welcome message to the client
	ws.send( "Welcome to the WebSocket server!" )
} )
