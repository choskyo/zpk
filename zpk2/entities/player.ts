import Physics = require('../components/physics');
import Storage = require('../components/storage');

//TODO: probably give players a reference to system they're in
class Player {
    private readonly id: number;
    private name: string;
    private credits: number;
    
    constructor(id: number, save: any) {
        this.id = id;
    }
    
    public physics: Physics = new Physics();
    public storage: Storage = new Storage();
    
    public getInit(): any {
        return {
            id: this.id,
            name: this.name,
            credits: this.credits,
            x: this.physics.getX(),
            y: this.physics.getY(),
            w: this.physics.getW(),
            h: this.physics.getH(),
            storage: this.storage.getContents()
        }
    }
    
    public getUpdate(): any {
        return {
            id: this.id,
            credits: this.credits,
            x: this.physics.getX(),
            y: this.physics.getY(),
            storage: this.storage.getContents()
        }
    }
    
    public static onConnect(socket: any, data: any): any {
        let p = new Player(socket.id, {});
        Player.list[p.id] = p;
        
        socket.emit('initPack', {
            ownId: socket.id,
            players: Player.getAllInits()
        })
    }
    
    public static getAllInits():any {
        let p = [];
        for(let l in Player.list)
            p.push(Player.list[l].getInit());
        return p;
    }
    
    public static update(): any {
        let p = [];
        for(let l in Player.list) {
            let player = Player.list[l];
            
            player.getUpdate();
            
            p.push(player.getUpdate());
        }
        return p;
    }
    
    public static list: any = {};
}

export = Player;