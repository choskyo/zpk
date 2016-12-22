class Utilities {
    public static getTime(): string {
        let d = new Date();
        return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    }
}

export = Utilities;