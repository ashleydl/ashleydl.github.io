class Furniture {
    name: string
    protected description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    useFurniture(game: Game) : void{
        game.out.println("Je gebruikte de " + this.name);
    }
}