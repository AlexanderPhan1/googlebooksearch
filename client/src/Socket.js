const io = require("socket.io-client");
const socket = io("http://localhost:3001");

function connect(callback) {
    socket.on('chat', (message) => {
        console.log(message)

        callback(message);
    })
}


export { connect };