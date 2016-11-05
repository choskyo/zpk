/**
 * Created by will on 06/08/16.
 */
function Area(name, star, planets, stations, ai, players) {

    this.name = name;
    this.star=star;
    this.planets = planets;
    this.stations = stations;
    this.ai = ai;
    this.players = players;

    Area.list[this.name] = this;
}

Area.list = {};

module.exports = Area;