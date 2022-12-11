const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const { sequelize, Players, Teams, Tournaments, Earnings, Matches, Members } = require('./Sequelize.js')


// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(async function(err) {
//     console.error('Unable to connect to the database, retrying');
//     setTimeout(await sequelize.authenticate(), 5000);
//   });

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
      if(players.length == 0){
        console.log("No players were found with the given birth year and month");
        console.log("Please try again with a different input");
        return
      }
      console.log("Player ID | Player Tag | Player Nationalality | " +
                  "Total Earnings")
      innitialValue = 0;
      console.log(players[0].player_id + ' ' + players[0].tag,
                  players[0].nationality,
                  players[0].earnings.reduce((accumulator, earnings) =>
                                              accumulator + earnings.prize_money,
                                              innitialValue));
    });
  }
  if(args[0] == 'Q2'){
    player_id = args[1]
    team_id = args[2]
    Members.findOne({
      where: {
        player_id: player_id,
        end_date: null
      }
    }).then((member) => {
      if(!member){
        console.log("No player was found with that ID, " +
                    "please check the id then try again.")
        return
      }
      if(member.team_id == team_id){
        console.log("That player is already on that team.")
        return
      }
      let today = new Date();
      member.end_date = today;
      member.save()
      Members.create({
        player_id: player_id,
        team_id: team_id,
        start_date: today,
        end_date: null
      });
    })
  }
});
