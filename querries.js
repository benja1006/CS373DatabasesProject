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
        date: db.where(db.fn('YEAR', db.col('birthday')), year),
        [Op.and]: db.where(db.fn('MONTH', db.col('birthday')), month)
      },
      include: [{
        model: Earnings,
        required: true
      }]
    }).then(

    });
  }
  if(args[0] == 'Q2'){

  }
});
