class CanonPrinter extends Furniture {

    constructor(name: string, description: string) {
        super(name, description);
    }

    public useFurniture(game: Game) : void {
        game.out.println("Portfolio uitgeprint! Beschrijving: " + this.description);
        game.charInv.push(new Item("Geprint Portfolio", "Vers uit de printer"));
    
    }
}