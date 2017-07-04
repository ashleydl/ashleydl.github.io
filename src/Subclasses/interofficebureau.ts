class bureau extends RoomObject {

    constructor(name: string, description: string, teacher: string) {
        super(teacher, "Clarissa " + description  + name);
    }

    public use(game: Game) : void {
        game.out.println("Je hebt een minor plaats gekregen! Pak hem op en ga naar de printer om je toestemming om je portfolio uit te printen!");
        game.currentRoom.inventory.push(new Item("Minor", "om naar london te gaan"));
    }
}