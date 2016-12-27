class Physics {
    
    constructor() {
        
    }
    
    private width: number;
    private height: number;
    public x: number;
    public y: number;
    private angle: number;
    private speedX: number;
    private speedY: number;
    
    public getX():number {
        return this.x;
    }
    public getY():number {
        return this.y;
    }
    public getW():number {
        return this.width;
    }
    public getH():number {
        return this.height;
    }
    public getAngleTo(e: any): number {
        let angle = Math.atan2(e.physics.y - this.y, e.physics.x - this.x) * 180/Math.PI;
        if(angle < 0)
            angle = 360 - (-angle);
        return angle;
    }
    public intersects(e: any): boolean {
            return !(e.physics.x > this.x + this.width ||
            e.physics.x + e.physics.width < this.x ||
            e.physics.y > this.y + this.height ||
            e.physics.y + e.physics.height < this.y);
    }
    public getDistance(e: any): number {
        if(e.physics != undefined) {
            return Math.sqrt( (this.x-e.physics.getX())*(this.x-e.physics.getX()) 
                + (this.y-e.physics.getY())*(this.y-e.physics.getY()) );
        }
    }
    
    public updatePosition():any {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

export = Physics;