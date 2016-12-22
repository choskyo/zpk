/**
 * Created by will on 07/08/16.
 */
var Team = function(initPack) {
    var self = {};
    self.name = initPack.name;
    self.score = initPack.score;

    self.draw = function() {
        teamScore.innerHTML = "";
        for(var t in Team.list) {
            teamScore.innerHTML += "| " + Team.list[t].name + ": " + Team.list[t].score + " |"
        }
    };

    Team.list[self.name] = self;

    return self;
};

Team.list = {};