class Room {
    description : string;
    inventory : Array<Item> = [];
    roomObjects : Array<RoomObject> = [];
    northExit : Room;
    southExit : Room;
    eastExit : Room;
    westExit : Room;

    

    /**
     * Create a room described "description". Initially, it has
     * no exits. "description" is something like "a kitchen" or
     * "an open court yard".
     * @param description The room's description.
     */
    constructor(description : string) {
        this.description = description;
        
    }

    /**
     * Define the exits of this room.  Every direction either leads
     * to another room or is null (no exit there).
     * @param north The north exit.
     * @param east The east east.
     * @param south The south exit.
     * @param west The west exit.
     */
    setExits(north : Room, east : Room, south : Room, west : Room) : void {
        if(north != null) {
            this.northExit = north;
        }
        if(east != null) {
            this.eastExit = east;
        }
        if(south != null) {
            this.southExit = south;
        }
        if(west != null) {
            this.westExit = west;
        }
    }
    setInventory(item:Item): void{
        this.inventory.push(item);
    }
    addRoomObject(roomObject:RoomObject): void{
        this.roomObjects.push(roomObject);
    }
    printExits(out:Printer){
        out.print("Locaties: ");
        if (this.northExit != null) {
            out.print("noord ");
        }
        if (this.eastExit != null) {
            out.print("oost ");
        }
        if (this.southExit != null) {
            out.print("zuid ");
        }
        if (this.westExit != null) {
            out.print("west ");
        }
    }

}

