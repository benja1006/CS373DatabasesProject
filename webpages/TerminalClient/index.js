import { TerminalUI } from "./TerminalUI.js";
//import io from "socket.io-client";

// IMPORTANT: Make sure you replace this address with your server address.

const serverAddress = "http://localhost:3000/";
var terminal;

function connectToSocket(serverAddress) {
  return new Promise(res => {
    const socket = io(serverAddress);
    res(socket);
  });
}

function startTerminal(container, socket) {
  // Create an xterm.js instance.
  terminal = new TerminalUI(socket);

  // Attach created terminal to a DOM element.
  terminal.attachTo(container);
  container.terminal = terminal

  // When terminal attached to DOM, start listening for input, output events.
  // Check TerminalUI startListening() function for details.
  terminal.startListening();

  return terminal
}

async function start() {
  const container = document.getElementById("terminal-container");
  // Connect to socket and when it is available, start terminal.
  let socket = await  connectToSocket(serverAddress)
  let terminal = startTerminal(container, socket);
  return terminal
}


// Better to start on DOMContentLoaded. So, we know terminal-container is loaded
var terminal = await start();

function button1(terminal){
  //document.terminal.sendInput('ls\n');
  terminal.sendInput('ls\n');
}

document.getElementById("javascript").onclick = function () {
  button1(terminal);
}
