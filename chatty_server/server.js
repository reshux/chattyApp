// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Count how many users are online
const onlineCounter = nbClients => {
  const infoMsg = { number: nbClients, type: 'onlineCounter' };
  wss.broadcast(JSON.stringify(infoMsg));
};

wss.on('connection', ws => {
  console.log('Client connected');
  // Call counter everytime a new client connects
  onlineCounter(wss.clients.size);
  ws.on('message', msg => {
    const incoming = JSON.parse(msg);
    const builder = {
      id: uuid(),
      username: incoming.username,
      content: incoming.content,
      type: '',
      counter: wss.clients.size
    };
    switch (incoming.type) {
      case 'postMessage':
        builder.type = 'incomingMessage';
        wss.broadcast(JSON.stringify(builder));
        break;
      case 'postNotification':
        builder.type = 'incomingNotification';
        wss.broadcast(JSON.stringify(builder));
        break;
      default:
        console.log('Error!');
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    onlineCounter(wss.clients.size);
  });
});

wss.broadcast = function(data) {
  wss.clients.forEach(function each(client) {
    // if (client.readyState === SocketServer.OPEN) {
    client.send(data);
    // }
  });
};
