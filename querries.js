const { Sequelize, DataTypes, Model, Op } = require('sequelize');
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

const args = process.argv.slice(2);

sequelize.sync().then(async () => {
  if(args[0] == 'Q1'){
    let year = args[1]
    let month = args[2]
    Players.findAll({
      where: {
        date: sequelize.where(sequelize.fn('YEAR', sequelize.col('birthday')), year),
        [Op.and]: sequelize.where(sequelize.fn('MONTH', sequelize.col('birthday')), month)
      },
      include: [{
        model: Earnings,
        required: true
      }]
    }).then((players) => {
      console.log(players[0].player_id + ' ' + players[0].tag, players[0].nationality, players[0].earnings.reduce((accumulator, earning)))
    });
  }
  if(args[0] == 'Q2'){

  }
});
