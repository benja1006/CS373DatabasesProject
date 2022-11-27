//import { Terminal } from "xterm";
//import "xterm/css/xterm.css"; // DO NOT forget importing xterm.css
//import { FitAddon } from './xterm-addon-fit';

export class TerminalUI {
  constructor(socket) {
    this.terminal = new Terminal();
    this.terminal.options.theme = {
      background: "#202B33",
      foreground: "#F5F8FA"
    };

    this.socket = socket;
  }

  startListening(){
    this.terminal.onData(data => this.sendInput(data));
    this.socket.on("output", data => {
      this.write(data);
    })
  }
  write(text){
    this.terminal.write(text);
  }
  prompt(){
    this.terminal.write("\r\n")
  }

  sendInput(input){
    this.socket.emit("input", input);
  }
  attachTo(container){
    const fitAddon = new FitAddon.FitAddon();
    this.terminal.loadAddon(fitAddon);
    this.terminal.open(container);
    fitAddon.fit();
    //this.sendInput('cd /app\n');
    //this.sendInput('cd app\n');
    this.terminal.write("Terminal connected");
    this.terminal.write("");
    this.prompt();
  }
  clear(){
    this.terminal.clear();
  }
}
