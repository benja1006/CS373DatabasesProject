const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize, Players, Teams, Tournaments, Earnings, Matches, Members } = require('./Sequelize.js')

const fs = require('fs')
const csv = require('csv')
const args = process.argv.slice(2);

function uploadFile(filePath, labels, callback){
  let rows  = []
  fs.createReadStream(filePath)
    .pipe(csv.parse({ headers: false }))
    .on("error", (error) => {
      throw error.message;
    })
    .on("data", (row) => {
      let obj = {}
      for (let i = 0; i < row.length; i++){
        obj[labels[i]] = row[i]
      }
      rows.push(obj)
    })
    .on("end", () => {
      //console.log(rows)
      callback(rows)
      })
}

let labels = {
  players: ['player_id', 'tag', 'real_name', 'nationality', 'birthday',
                'game_race'],
  earnings: ['tournament_id', 'player_id', 'prize_money', 'position'],
  matches: ['match_id', 'date', 'tournament_id', 'playerA_id', 'playerB_id',
            'playerA_score', 'playerB_score', 'offline'],
  members: ['player_id', 'team_id', 'start_date', 'end_date'],
  teams: ['team_id', 'team_name', 'founded', 'disbanded'],
  tournaments: ['tournament_id', 'tournament_name', 'region', 'major']

}
let tables = {
  players: Players,
  earnings: Earnings,
  matches: Matches,
  members: Members,
  teams: Teams,
  tournaments: Tournaments
}

sequelize.sync({force: false}).then(async () => {
  if(args[0] == 'setup'){
    console.log('DB setup')
  }
  else if(args[0] == 'reset'){
    console.log('Clearing DB');
    sequelize.drop().then(() => {
      console.log('Tables Dropped.');
    });
  }
  else {
    if(labels.hasOwnProperty(args[0])){
      let localLabels = labels[args[0]];
      uploadFile('data/' + args[0] + '.csv', localLabels, (data) => {
        tables[args[0]].bulkCreate(data, {
          ignoreDuplicates: true
        });
      });
    }
  }
});
