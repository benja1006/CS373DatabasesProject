const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize, Players, Teams, Tournaments, Earnings, Matches, Members } = require('./Sequelize.js')
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(async function(err) {
    console.error('Unable to connect to the database, retrying');
    setTimeout(await sequelize.authenticate(), 5000);
  });


sequelize.sync().then(async () => {

});
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app)
const port  = 3000;

const SocketService = require("./TerminalServer/SocketService");


let options = {
  dotfiles: 'ignore',
  extensions: ['html']
}
app.use(express.static(path.join(__dirname, 'webpages'), options));

server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
  const socketService = new SocketService();
  socketService.attachServer(server);
})
