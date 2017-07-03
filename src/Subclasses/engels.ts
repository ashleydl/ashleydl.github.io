class engels extends Item
{
    location: "london";

    constructor(name: string, description: string, location: boolean) {
        super(name, description);
        this.location="london";

    }
    public use(game: Game) : void {
        game.out.println("Portfolio uitgeprint! Hij ligt in de " + this.name);
        game.currentRoom.inventory.push(new Item("minor", "dankzij engels"));
}
}