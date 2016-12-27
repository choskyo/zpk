class System {
    
    private readonly name: string = "";
    private players: any = [];
    private stations: any = [];
    private npcs: any = [];
    
    constructor(name: string) {
        this.name = name;
    }
    
    public getPlayers(): any {
        return this.players;
    }
    public addPlayer(player: any): any {
        this.players[player.id] = player;
    }
    public delPlayer(player: any): any {
        delete this.players[player.id];
    }
    
    public getStations(): any {
        return this.stations;
    }
    public addStation(station: any): any {
        this.stations[station.id] = station;
    }
    
    public getNPCs(): any {
        return this.players;
    }
    public addNPC(): any {
        return this.players;
    }
    
    public getName(): string {
        return this.name;
    }
}

export = System;