class Game {
    parser: Parser;
    out: Printer;
    charInv: Array<Item> = [];
    currentRoom: Room;
    items: Array<Item> = [];
    isOn: boolean;

    /**
     * Create the game and initialise its internal map.
     */
    constructor(output: HTMLElement, input: HTMLInputElement) {
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.createRooms();
        this.printWelcome();
    }


    /**
     * Create all the rooms and link their exits together.
     */

    createRooms(): void {
        // create the rooms
        let itroom = new Room("de ICT ruimte");
        let helpdesk = new Room("aan de receptie");
        let firstfloor = new Room("op de 1e verdieping");
        let groundfloor = new Room("op de begaande grond");
        let teacherroom = new Room("in de lerarenkamer");
        let printroom = new Room("bij de printer");
        let interoffice = new Room("in de international office");
        let atrium = new Room("in het atrium");
        let av = new Room("AV dienst");
        let basement = new Room("de kelder");

        //items and roomobjects in rooms
        av.addRoomObject(new avcamera("avcamera", "dit is de camera van de avdienst"));
        printroom.addRoomObject(new CanonPrinter("printer", "Dit is een Canon Printer"));
        helpdesk.setInventory(new Item("reservering", "om een lokaal te huren"));
        interoffice.addRoomObject(new bureau("bureau", "hier vind je alles voor het buitenland", "Clarissa"));

        // initialise room exits
        teacherroom.setExits(null, null, itroom, null);

        itroom.setExits(teacherroom, printroom, firstfloor, null);
        printroom.setExits(null, null, null, itroom);

        firstfloor.setExits(itroom, interoffice, groundfloor, null);
        interoffice.setExits(null, null, null, firstfloor);

        groundfloor.setExits(firstfloor, helpdesk, null, atrium);

        helpdesk.setExits(null, av, basement, groundfloor);
        av.setExits(null, null, null, helpdesk);
        basement.setExits(helpdesk, null, null, null);

        atrium.setExits(null, groundfloor, null, null);


        // spawn player outside
        this.currentRoom = itroom;

    }

    /**
     * Print out the opening message for the player.
     */
    printWelcome(): void {
        this.out.println();
        this.out.println("Welkom op het HZ");
        this.out.println("Om dit schooljaar te halen heb je bepaalde items nodig voor studiepunten.");
        this.out.println("Commando's : ga, help, pak, inleveren");
        this.out.println("Je bent nu in " + this.currentRoom.description);
        this.out.println("Waar wil je heen? ");

        if (this.currentRoom.northExit != null) {
            this.out.println("noord: " + this.currentRoom.northExit.description);
        }
        if (this.currentRoom.eastExit != null) {
            this.out.println("oost: " + this.currentRoom.eastExit.description);
        }
        if (this.currentRoom.southExit != null) {
            this.out.println("zuid: " + this.currentRoom.southExit.description);
        }
        if (this.currentRoom.westExit != null) {
            this.out.println("west: " + this.currentRoom.westExit.description);
        }

        this.out.println();
        this.out.print(">");

    }

    gameOver(): void {
        this.isOn = false;
        this.out.println("De game is klaar");
        this.out.println("Druk F5 om game te herstarten");
    }


    /**
     * Print out error message when user enters unknown command.
     * Here we print some erro message and a list of the 
     * command words.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    printError(params: string[]): boolean {
        this.out.println("Typ help als je hulp nodig hebt. Begin elke zin met ga.");
        this.out.println();
        this.out.println("Je bent nu in " + this.currentRoom.description);
        this.out.print("Kamers: ");
        return false;
    }

    /**Grab the item or a message that there is no item */

    getItem(params: string[]): boolean {

        let removeIndex;
        for (var item of this.currentRoom.inventory) {
            if (item != null) {
                this.charInv.push(item);
                this.out.println("Je pakt op: " + item.name);
                removeIndex = this.currentRoom.inventory.indexOf(item);
                break;
            }
        }
        if (removeIndex != null) {
            this.currentRoom.inventory[removeIndex] = null;
        }
        else {
            this.out.println("Je kunt hier niks vinden om op te pakken");
        }
        return false;

    }

    /*inventory*/
    viewItems(params: string[]): boolean {

        if (this.charInv.length > 0) {
            for (var item of this.charInv) {
                if (item != null) {
                    this.out.println((this.charInv.indexOf(item) + 1) + ": " + item.name);
                }
            }
        }
        else {
            this.out.println("Je hebt geen items.");
        }
        return false;

    }

    /** Print out some help information */

    printHelp(params: string[]): boolean {
        if (params.length > 0) {
            this.out.println("Help met wat?");
            return false;
        }
        this.out.println("Je probeert je schooljaar te halen.");
        this.out.println("Haal je items op om je portfolio te halen.");
        this.out.println("Commando's : ga, help, pak, gebruik, inventaris, vraag");
        this.out.println("Je bent nu in " + this.currentRoom.description);
        this.out.println("Waar wil je heen? ");

        if (this.currentRoom.northExit != null) {
            this.out.println("noord: " + this.currentRoom.northExit.description);
        }
        if (this.currentRoom.eastExit != null) {
            this.out.println("oost: " + this.currentRoom.eastExit.description);
        }
        if (this.currentRoom.southExit != null) {
            this.out.println("zuid: " + this.currentRoom.southExit.description);
        }
        if (this.currentRoom.westExit != null) {
            this.out.println("west: " + this.currentRoom.westExit.description);
        }

        this.out.println();
        this.out.print(">");

    }

    /** 
     * Try to go in one direction. If there is an exit, enter
     * the new room, otherwise print an error message.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    goRoom(params: string[]): boolean {
        console.log(this.currentRoom.inventory[0]);
        if (params.length == 0) {

            // if there is no second word, we don't know where to go...
            this.out.println("Waarheen?");
            return;
        }

        let direction = params[0];

        // Try to leave current room.
        let nextRoom = null;
        switch (direction) {
            case "noord":
                nextRoom = this.currentRoom.northExit;
                break;
            case "oost":
                nextRoom = this.currentRoom.eastExit;
                break;
            case "zuid":
                nextRoom = this.currentRoom.southExit;
                break;
            case "west":
                nextRoom = this.currentRoom.westExit;
                break;
        }

        if (nextRoom == null) {
            this.out.println("Hier kun je niet heen, kies een andere optie.");
        }
        else {
            this.changeRoom(nextRoom);
        }
        return false;
    }


    changeRoom(nextRoom: Room) {
        this.currentRoom = nextRoom;
        this.out.println("Je nieuwe locatie is: " + this.currentRoom.description);
        for (var item of this.currentRoom.inventory) {
            if (item != null) {
                this.out.println(String("in deze kamer ligt " + item.name));
            }
        }
        for (var roomobject of this.currentRoom.roomObjects) {
            this.out.println(String("in deze kamer staat " + roomobject.name));
        }
        this.currentRoom.printExits(this.out);
        this.out.println();
    }


      /*Using RoomObject to get an item*/
    usecanonprinter(params: string[]): boolean {
        for (let i = 0; i < this.charInv.length; i++) {
            if (this.charInv[i].name == "minor") {
        if (params.length == 0) {
            this.out.println("Gebruik wat?");
        }
            }
        
        let roomObjectWord = params[0];

        for (let roomObject of this.currentRoom.roomObjects) {
            if (roomObject.name == roomObjectWord) {
                roomObject.use(this);

        if (this.currentRoom.eastExit != null) {
            this.out.println("oost: " + this.currentRoom.eastExit.description);
       
        }

        this.out.println();
        this.out.print(">");
                return false;
               }
        }
        
       {
            this.out.println("Je kunt de printer nu niet gebruiken");
            return false;
        }
    }
}

    useavcamera(params: string[]): boolean {
        for (let i = 0; i < this.charInv.length; i++) {
            if (this.charInv[i].name == "sleutel") {
        if (params.length == 0) {
            this.out.println("Gebruik wat?");
        }
            }
        }
        
        let roomObjectWord = params[0];

        for (var roomObject of this.currentRoom.roomObjects) {
            if (roomObject.name == roomObjectWord) {
                roomObject.use(this);
        if (this.currentRoom.westExit != null) {
            this.out.println("west: " + this.currentRoom.westExit.description);
        }
                return false;
               }
        }
     
    }


 useinterofficebureau(params: string[]): boolean {
        for (let i = 0; i < this.charInv.length; i++) {
            if (this.charInv[i].name == "Engels")
             {
        if (params.length == 0) {
            this.out.println("Gebruik wat?");
        }
            }
        }
        
        let roomObjectWord = params[0];

        for (var roomObject of this.currentRoom.roomObjects) {
            if (roomObject.name == roomObjectWord) {
                roomObject.use(this);
        if (this.currentRoom.westExit != null) {
            this.out.println("west: " + this.currentRoom.westExit.description);
        }
                return false;
               }
        }
     
    }
    

    

     useItem(params: string[]): boolean {
        for (let i = 0; i < this.charInv.length; i++) {
            if (this.currentRoom.description == "in de lerarenkamer" && this.charInv[i].name == "Portfolio") {
                let teacherroom = new Room("in de lerarenkamer");
                teacherroom.setInventory(this.items[1]);
                this.out.println("Je levert je portfolio in");
                this.out.println("Gefeliciteerd je hebt een voldoende!");
                this.out.println("Je hebt het schooljaar overleefd en gaat door naar het volgende jaar.");
                this.currentRoom = teacherroom;
                return true;
            }
            else {
                if(this.charInv[i].name == "appel" && this.currentRoom.description == "in de lerarenkamer"){
                    this.out.println("Dankzij de ingeleverde appel krijg je een extra glimlach")
                }
            }
        }
        
        {
            this.out.println("Je hebt geen items, of levert ze niet op de juiste plaats in.");
            return false;
        }
        
    }

    /** 
     * "Quit" was entered. Check the rest of the command to see
     * whether we really quit the game.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    quit(params: string[]): boolean {
        if (params.length > 0) {
            this.out.println("Stop met wat?");
            return false;
        }
        else {
            return true;  // signal that we want to quit
        }
    }
}