/**
 * Created by will on 15/08/16.
 */
document.onmousedown = (e) => {
    if(!Player.list[ownId].docked) {
        socket.emit('kP',{input:'attack',state:true});
    } else {
        soClick.play();
    }
};
document.onmouseup = (e) => socket.emit('kP',{input:'attack',state:false});
document.onmousemove = (e) => {
    var co = {
        x: e.clientX,
        y: e.clientY,
        centerX: window.innerWidth/2,
        centerY: window.innerHeight/2
    };

    socket.emit('kP',{input:'mousePos',co});
};
document.onkeydown = (e) => {
    switch(e.keyCode) {
        case 87: //w
            socket.emit('kP',{input:'up',state:true});
            break;
        case 65: //a
            socket.emit('kP',{input:'left',state:true});
            break;
        case 83: //s
            socket.emit('kP',{input:'down',state:true});
            break;
        case 68: //d
            socket.emit('kP',{input:'right',state:true});
            break;
        case 70: //f
            socket.emit('kP',{input:'warp', state:true});
            break;
        case 82: //r
            socket.emit('kP',{input:'dock', state:true});
            break;
    }
};
document.onkeyup = (e) => {
    switch(e.keyCode) {
        case 87: //w
            socket.emit('kP',{input:'up',state:false});
            break;
        case 65: //a
            socket.emit('kP',{input:'left',state:false});
            break;
        case 83: //s
            socket.emit('kP',{input:'down',state:false});
            break;
        case 68: //d
            socket.emit('kP',{input:'right',state:false});
            break;
        case 70: //f
            socket.emit('kP',{input:'warp', state:false});
            break;
    }
};

respawn.onclick = () => socket.emit('respawnRequest', ownId);
btnUndock.onclick = () => socket.emit('kP',{input:'dock', state:false});

btnBuy.onclick = () => {
    var tempForm = document.getElementById('stationTrade');
    socket.emit('purchase', {item: JSON.parse(tempForm.elements["tradeCommod"].value),
        stationId: Player.list[ownId].dockedAt,
        playerId: Player.list[ownId].id});

    Player.list[ownId].flick = false;
    Player.list[ownId].drawStationScreen();
};
btnSell.onclick = () => {
    var tempForm = document.getElementById('stationTrade');
    socket.emit('sale', {item: JSON.parse(tempForm.elements["tradeCommod"].value),
        stationId: Player.list[ownId].dockedAt,
        playerId: Player.list[ownId].id});

    Player.list[ownId].flick = false;
    Player.list[ownId].drawStationScreen();
};



//MOBILE
if(isMobile) {
    mobileUI.style.display = 'absolute'
} else {
    mobileUI.style.display = 'none'
}

mobUp.addEventListener('touchstart', function(e) {
    e.preventDefault();
    socket.emit('kP',{input:'up',state:true});
}, false);
mobDown.addEventListener('touchstart', function(e) {
    e.preventDefault();
    socket.emit('kP',{input:'down',state:true});
}, false);
mobLeft.addEventListener('touchstart', function(e) {
    e.preventDefault();
    socket.emit('kP',{input:'left',state:true});
}, false);
mobRight.addEventListener('touchstart', function(e) {
    e.preventDefault();
    socket.emit('kP',{input:'right',state:true});
}, false);
mobAction.addEventListener('touchstart', function(e) {
    e.preventDefault();
    for(var w in Wormhole.list) {
        if(Player.list[ownId].intersects(w)) {
            socket.emit('kP',{input:'warp', state:true});
            return;
        }
    }
    for(var s in Station.list) {
        if(Player.list[ownId].intersects(s)) {
            socket.emit('kP',{input:'dock', state:true});
            return;
        }
    }

    socket.emit('kP',{input:'attack',state:true});
}, false);

mobUp.addEventListener('touchend', function(e) {
    e.preventDefault();
    socket.emit('kP',{input:'up',state:false});
}, false);
mobDown.addEventListener('touchend', function(e) {
    e.preventDefault();
    socket.emit('kP',{input:'down',state:false});
}, false);
mobLeft.addEventListener('touchend', function(e) {
    e.preventDefault();
    socket.emit('kP',{input:'left',state:false});
}, false);
mobRight.addEventListener('touchend', function(e) {
    e.preventDefault();
    socket.emit('kP',{input:'right',state:false});
}, false);
mobAction.addEventListener('touchend', function(e) {
    e.preventDefault();
    socket.emit('kP',{input:'warp', state:false});
    socket.emit('kP',{input:'attack',state:false});
}, false);