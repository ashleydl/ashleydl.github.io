abstract class RoomObject {

    name: string
    protected description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    abstract use(game: Game) : void
    
}