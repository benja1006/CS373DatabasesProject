const { Sequelize, DataTypes, Model } = require('sequelize');
const SQLUSERNAME = 'root'
const SQLPASSWORD = 'password'
const sequelize = new Sequelize('ResultTrackerBenjaShare', SQLUSERNAME, SQLPASSWORD, {
  host: 'resultTrackerDB',
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  logging: false
});



class Players extends Model{}
Players.init({
  player_id: {
    type: DataTypes.INTEGER(4),
    primaryKey: true,
    autoIncrement: true
  },
  tag: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  real_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  nationality: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  game_race: {
    type: DataTypes.STRING(1),
    isIn: [['Z', 'P', 'T']]
  }
}, {
  sequelize,
  modelName: 'players'
});

class Teams extends Model{}
Teams.init({
  team_id:  {
    type: DataTypes.INTEGER(4),
    primaryKey: true,
    autoIncrement: true
  },
  team_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  founded: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  disbanded:  {
    type: DataTypes.DATEONLY,
    allowNull: true,
    set(value) {
      if(value == ''){
        this.setDataValue('disbanded', null);
      }
      else{
        this.setDataValue('disbanded', value)
      }
    }
  }
}, {
  sequelize,
  modelName: 'teams'
});

class Tournaments extends  Model{}
Tournaments.init({
  tournament_id:  {
    type:  DataTypes.INTEGER(4),
    primaryKey: true,
    autoIncrement: true
  },
  tournament_name:  {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  region: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
  major: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'tournaments'
});

class Earnings extends Model{}
Earnings.init({
  tournament_id:  {
    type:  DataTypes.INTEGER(4),
    primaryKey: true
  },
  player_id: {
    type: DataTypes.INTEGER(4),
    primaryKey: true
  },
  prize_money: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: "0",
    set(value) {
      if(value == ''){
        this.setDataValue('prize_money', 0);
      }
      else{
        this.setDataValue('prize_money', value)
      }
    }
  },
  position: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'earnings'
});

class Matches extends Model{}
Matches.init({
  match_id: {
    type:  DataTypes.INTEGER(4),
    primaryKey: true
  },
  date:  {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  tournament_id: {
    type:  DataTypes.INTEGER(4),
    allowNull: false
  },
  playerA_id:  {
    type: DataTypes.INTEGER(4),
    allowNull: false
  },
  playerB_id:  {
    type: DataTypes.INTEGER(4),
    allowNull: false
  },
  playerA_score: {
    type: DataTypes.INTEGER(2),
    allowNull: false
  },
  playerB_score: {
    type: DataTypes.INTEGER(2),
    allowNull: false
  },
  offline: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'matches'
});

class Members extends Model{}
Members.init({
  player_id: {
    type: DataTypes.INTEGER(4),
    primaryKey: true
  },
  team_id: {
    type: DataTypes.INTEGER(4),
    primaryKey: true
  },
  start_date: {
    type: DataTypes.DATEONLY,
    primaryKey: true
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    set(value) {
      if(value == ''){
        this.setDataValue('end_date', null);
      }
      else{
        this.setDataValue('end_date', value);
      }
    }
  }
}, {
  sequelize,
  modelName: 'members'
});

// Associations
Tournaments.hasMany(Earnings, {
  foreignKey: 'tournament_id'
});
Earnings.belongsTo(Tournaments, {
  foreignKey: 'tournament_id'
});

Tournaments.hasMany(Matches, {
  foreignKey: 'tournament_id'
});
Matches.belongsTo(Tournaments, {
  foreignKey: 'tournament_id'
})

Players.hasMany(Earnings, {
  foreignKey: 'player_id'
});
Earnings.belongsTo(Players, {
  foreignKey: 'player_id'
});

Players.hasMany(Members, {
  foreignKey: 'player_id'
});
Members.belongsTo(Players, {
  foreignKey: 'player_id'
});

Players.hasMany(Matches, {
  foreignKey: 'playerA_id'
});

Players.hasMany(Matches, {
  foreignKey: 'playerB_id'
});

Teams.hasMany(Members, {
    foreignKey: 'team_id'
});

Members.belongsTo(Teams, {
  foreignKey: 'team_id'
});

module.exports = {sequelize, Players, Teams, Tournaments, Earnings, Matches, Members}
