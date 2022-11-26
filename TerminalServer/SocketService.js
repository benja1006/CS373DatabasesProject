const SocketIO = require("socket.io");
const PTYService = require("./PTYService");

class SocketService {
  constructor() {
    this.socket = null;
    this.pty = null;
  }

  attachServer(server) {
    if(!server){
      throw new Error("Server not found...");
    }

    const io = SocketIO(server);
    console.log("Created socket server. Waiting for client connection.");

    io.on("connection", socket => {
      console.log("Client connect to socket.", socket.id);

      this.socket = socket;

      this.socket.on("disconnect", () => {
        console.log("Disconnected Socket: ", socket.id);
      });

      // Create a new pty service when client connects.
      this.pty = new PTYService(this.socket);

     // Attach event listener for socket.io
      this.socket.on("input", input => {
        // Runs this listener when socket receives "input" events from socket.io client.
                // input event is emitted on client side when user types in terminal UI
        this.pty.write(input);
      });
    });
  }
}
module.exports = SocketService;
