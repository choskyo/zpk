/**
 * Created by will on 04/08/16.
 */
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
mobShoot.addEventListener('touchstart', function(e) {
    e.preventDefault();
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
mobShoot.addEventListener('touchend', function(e) {
    e.preventDefault();
    socket.emit('kP',{input:'attack',state:false});
}, false);