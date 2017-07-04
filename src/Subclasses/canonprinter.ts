class CanonPrinter extends RoomObject {

    constructor(name: string, description: string) {
        super(name, "Printer: " + description);
    }

    public use(game: Game) : void {
        game.out.println("Portfolio uitgeprint! Hij ligt in de " + this.name);
        game.currentRoom.inventory.push(new Item("Portfolio", "Vers uit de printer"));
        
    }
}