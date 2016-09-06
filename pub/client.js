/**
 * Created by will on 14/07/16.
 */
socket.on('initPack', function(pack) {
    if(pack.ownId)
        ownId = pack.ownId;

    me = Player.list[ownId];

    for(var i = 0 ; i < pack.players.length; i++){
        new Player(pack.players[i]);
    }
    for(var j = 0 ; j < pack.projectiles.length; j++){
        new Projectile(pack.projectiles[j]);
    }
    for(var k = 0; k < pack.stations.length; k++) {
        new Station(pack.stations[k]);
    }
    for(var l = 0; l < pack.wormholes.length; l++) {
        new Wormhole(pack.wormholes[l]);
    }
    for(var t = 0; t < pack.teams.length; t++) {
        new Team(pack.teams[t]);
    }
    for(var p = 0; p < pack.planets.length; p++) {
        new Planet(pack.planets[p]);
    }
    for(var e = 0; e < pack.enemies.length; e++) {
        new Enemy(pack.enemies[e]);
    }
});

socket.on('updatePack', function(pack) {
    for(var i = 0; i < pack.players.length; i++) {
        var p = pack.players[i];
        var player = Player.list[p.id];
        if(player) {
            if(p.credits != undefined)
                player.credits = p.credits;
            if(p.x != undefined)
                player.x = p.x;
            if(p.y != undefined)
                player.y = p.y;
            if(p.shields != undefined) {
                if(p.shields == player.shields) {
                    player.shieldsChange = false;
                } else {
                    player.shields = p.shields;
                    player.shieldsChange = true;
                }
            }
            if(p.storage != undefined) {
                if(JSON.stringify(p.storage)== JSON.stringify(player.storage)) {
                    player.storageChange = false;
                } else {
                    player.storage = p.storage;
                    player.storageChange = true;
                }
            }

            if(p.angle != undefined)
                player.angle = p.angle;
            if(p.area != undefined)
                player.area = p.area;
            if(p.r != undefined)
                player.r = p.r;
            if(p.g != undefined)
                player.g = p.g;
            if(p.b != undefined)
                player.b = p.b;
            if(p.docked != undefined)
                player.docked = p.docked;
            if(p.dockedAt != undefined)
                player.dockedAt = p.dockedAt;
            if(p.credits != undefined) {
                if(p.credits == player.credits) {
                    player.creditsChange = false;
                } else {
                    player.credits = p.credits;
                    player.creditsChange = true;
                }
            }
        }
    }

    for(var j = 0; j < pack.projectiles.length; j++) {
        var q = pack.projectiles[j];
        var projectile = Projectile.list[q.id];
        if(projectile) {
            if(q.x != undefined)
                projectile.x = q.x;
            if(q.y != undefined)
                projectile.y = q.y;
            if(q.shields != undefined)
                projectile.shields = q.shields;
            if(q.area != undefined)
                projectile.area = q.area;
        }
    }

    for(var e = 0; e < pack.enemies.length; e++) {
        var pe = pack.enemies[e];
        var le = Enemy.list[pe.id];
        if(le) {
            if(pe.x != undefined)
                le.x = pe.x;
            if(pe.y != undefined)
                le.y = pe.y;
            if(pe.r != undefined)
                le.r = pe.r;
            if(pe.g != undefined)
                le.g = pe.g;
            if(pe.b != undefined)
                le.b = pe.b;
            if(pe.shields != undefined)
                le.shields = pe.shields;
            if(pe.storage != undefined)
                le.storage = pe.storage;
            if(pe.credits != undefined)
                le.credits = pe.credits;
            if(pe.angle != undefined)
                le.angle = pe.angle;
        }
    }

    for(var k = 0; k < pack.stations.length; k++) {
        var r = pack.stations[k];
        var station = Station.list[r.id];
        if(station) {
            if(r.x != undefined)
                station.x = r.x;
            if(r.y != undefined)
                station.y = r.y;
            if(r.storage != undefined)
                station.storage = r.storage;
        }
    }

    for(var l = 0; l < pack.wormholes.length; l++) {
        var s = pack.wormholes[l];
        var wormhole = Wormhole.list[s.id];
        if(wormhole) {
            if(s.x != undefined)
                wormhole.x = s.x;
            if(s.y != undefined)
                wormhole.y = s.y;
        }
    }

    for(var t = 0; t < pack.teams.length; t++) {
        var u = pack.teams[t];
        var team = Team.list[u.name];
        if(team) {
            if(u.score != undefined)
                team.score = u.score;
        }
    }

    for(var z = 0; z < pack.planets.length; z++) {
        var pl = pack.planets[z];
        var planet = Planet.list[pl.id];
        if(planet) {
            if(pl.x != undefined)
                planet.x = pl.x;
            if(pl.y != undefined)
                planet.y = pl.y;
        }
    }
});

socket.on('delPack', function(pack) {
    for(var i = 0; i < pack.players.length; i++)
        delete Player.list[pack.players[i]];

    for(var j = 0; j < pack.projectiles.length; j++)
        delete Projectile.list[pack.projectiles[j]];

    for(var e = 0; e < pack.enemies.length; e++)
        delete Enemy.list[pack.enemies[e]];
});

setInterval(() => {
    if(!ownId)
        return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //DRAW SUN(TEMP)
    ctx.drawImage(sun, 0-Player.list[ownId].x + canvas.width/2-500, - Player.list[ownId].y + canvas.height/2-500);

    for(var pl2 in Planet.list)
        Planet.list[pl2].draw();

    for(var st in Station.list)
        Station.list[st].draw();

    for(var wh in Wormhole.list)
        Wormhole.list[wh].draw();

    for(var pl in Player.list)
        Player.list[pl].draw();

    for(var en in Enemy.list)
        Enemy.list[en].draw();
    
    for(var pr in Projectile.list)
        Projectile.list[pr].draw();

    for(var te in Team.list)
        Team.list[te].draw();


}, 1000/30);

window.onresize = () => {
    setSizes();
    drawStars();
};
setSizes();
drawStars();

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    };
    this.stop = function () {
        this.sound.pause();
    }
}
var soClick = new sound('./pub/click.wav');
soClick.sound.volume = 0.5;