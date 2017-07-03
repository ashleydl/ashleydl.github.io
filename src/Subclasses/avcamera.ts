class avcamera extends RoomObject {

    constructor(name: string, description: string) {
        super(name, "avcamera: " + description);
    }

    public use(game: Game) : void {
        game.out.println("Engels gesprek opgenomen! Dankzij de " + this.name);
        game.currentRoom.inventory.push(new Item("Engels", "opgenomen met de camera"));
          game.out.println("Je kunt nu goed engels spreken, haal bij de international office je minorplaats op.");
    }
}