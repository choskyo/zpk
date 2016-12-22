/**
 * Created by will on 07/08/16.
 */
var Team = function(n, pvp) {

    var name = n;
    this.canPvP = pvp;
    var score = 0;

    this.getInitPack = function() {
        return {
            name: name,
            score: score
        }
    };

    this.getUpdatePack = function() {
        return {
            name: name,
            score: score
        }
    };

    this.addScore = function() {
        score++;
    };
    Team.list[name] = this;

    return this;
};

Team.list = {};

Team.getAllPacks = function() {
    var teams = [];
    for(var t in Team.list)
        teams.push(Team.list[t].getInitPack());
    return teams;
};
Team.update = function() {
    var pack = [];

    for(var t in Team.list) {

        var team = Team.list[t];

        pack.push(team.getUpdatePack());
    }
    return pack;
};

module.exports = Team;