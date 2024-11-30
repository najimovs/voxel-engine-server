const WebSocket = require( "ws" )

// Create a WebSocket server
const wss = new WebSocket.Server( { port: 8080 } )

console.log( "WebSocket server is running on port 8080" )

// When a new client connects
wss.on( "connection", ws => {

	console.log( "A new client connected!" )

	// When the server receives a message from the client
	ws.on( "message", message => {

		message = message.toString()

		const { type, data } = JSON.parse( message )

		if ( type === "ATTACH" ) {

			for ( const client of wss.clients ) {

				if ( client !== ws && client.readyState === WebSocket.OPEN ) {

					client.send( message )
				}
			}
		}
		else if ( type === "DETACH" ) {

			for ( const client of wss.clients ) {

				if ( client !== ws && client.readyState === WebSocket.OPEN ) {

					client.send( message )
				}
			}
		}
	} )

	// When the client disconnects
	ws.on( "close", () => {

		console.log( "A client disconnected." )
	} )
} )
