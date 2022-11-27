import { TerminalUI } from "./TerminalUI.js";
//import io from "socket.io-client";

// IMPORTANT: Make sure you replace this address with your server address.

const serverAddress = "http://localhost:3000/";
var terminal;
var options = [['players', 'Players'], ['teams', 'Teams'],
               ['tournaments', 'Tournaments'], ['earnings', 'Earnings'],
               ['matches', 'Matches'], ['members', 'Members']];

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
  return terminal;
}


// Better to start on DOMContentLoaded. So, we know terminal-container is loaded
var terminal = await start();

function insert(terminal){
  let dropdown = document.getElementById("insertTable")
  let table = dropdown.value;
  terminal.sendInput('node ~/app/insert ' + table + '\n');
  //console.log('node ~/app/insert ' + table + '\n');
  let i = 0;
  for(i = 0; i < options.length; i++){
    if(options[i][0] == table){
      break;
    }
  }
  if(i < options.length -  1){
    dropdown.value = options[i+1][0]
  }
  //find a value of options where option[0] = table
  //terminal.sendInput('ls\n');
}

function setDropdown () {
  let dropdown = document.getElementById("insertTable");

  options.forEach((option, idx) => {
    let text = "<option value='"+ option[0] + "'>" + option[1] + "</option>"
    dropdown.innerHTML += text;
  });

}
document.getElementById("insertButton").onclick = function () {
  insert(terminal);
}
setDropdown();
