/**
 * This class is part of the "Zorld of Wuul" application. 
 * "Zorld of Wuul" is a very simple, text based adventure game.  
 * 
 * Users can walk around some scenery. That's all. It should really be 
 * extended to make it more interesting!
 * 
 * To play this game, create an instance of this class and call the "play"
 * method.
 * 
 * This main class creates and initialises all the others: it creates all
 * rooms, creates the parser and starts the game.  It also evaluates and
 * executes the commands that the parser returns.
 * 
 * @author  Michael Kölling, David J. Barnes and Bugslayer
 * @version 2017.03.30
 */
class Game {
    parser : Parser;
    out : Printer;
    charInv: Array<Item> = [];
    currentRoom : Room;
    items: Array<Item> = [];
    isOn : boolean;

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

    createRooms() : void {
        // create the rooms
        let itroom = new Room("de ICT ruimte");
        let helpdesk = new Room("aan de receptie");
        let firstfloor = new Room("op de 1e verdieping");
        let groundfloor = new Room("op de begaande grond");
        let teacherroom = new Room("in de lerarenkamer");
        let printroom = new Room ("bij de printer");
        let interoffice = new Room ("bij de international office");
        let atrium = new Room ("in het atrium");
        let av = new Room ("AV dienst");
        let basement = new Room ("de kelder");
        
      
        
        //items and furniture in rooms
        av.setInventory(new Item("engelsportfolio", "Engelsportfolio"));
        printroom.setFurniture(new CanonPrinter("canonPrinter", "Dit is een printer"));
        printroom.setInventory(new Item("portfolio", "Voor ontwerpen"));
        interoffice.setInventory(new Item("minor", "in het buitenland een minor volgen"));
      


        // initialise room exits
        itroom.setExits(teacherroom, printroom, firstfloor, null);
        helpdesk.setExits(null, av, basement , null);
        basement.setExits(null, null, helpdesk , null);
        firstfloor.setExits(itroom, interoffice, groundfloor, null);
        interoffice.setExits(null, firstfloor, null, null);
        groundfloor.setExits(null, helpdesk, atrium, null);
        atrium.setExits(null, groundfloor, null, null);
        teacherroom.setExits(null, null, itroom, null);
        av.setExits(null, helpdesk, null, null);
        printroom.setExits(null, itroom, null, null);
        
       

        // spawn player outside
        this.currentRoom = itroom;

    }

    /**
     * Print out the opening message for the player.
     */
    printWelcome() : void {
        this.out.println();
        this.out.println("Welkom op het HZ");
        this.out.println("Typ het woord ga en dan de richting waar je heen wilt");
        this.out.println();
        this.out.println("Je bent nu in " + this.currentRoom.description);
        this.out.println("Waar wil je heen? ");
       
        if(this.currentRoom.northExit != null) {
            this.out.println("noord: " + this.currentRoom.northExit.description);
        }
        
        if(this.currentRoom.eastExit != null) {
            this.out.println("oost: " + this.currentRoom.eastExit.description);
        }
        if(this.currentRoom.southExit != null) {
            this.out.println("zuid: " + this.currentRoom.southExit.description);
        }
        if(this.currentRoom.westExit != null) {
            this.out.println("west: " + this.currentRoom.westExit.description);
        }

        this.out.println();
        this.out.print(">");

    }

    gameOver() : void {
        this.isOn = false;
        this.out.println("Je hebt je diploma niet kunnen halen, probeer het opnieuw. ");
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
    printError(params : string[]) : boolean {
        this.out.println("Typ help als je hulp nodig hebt. Begin elke zin met ga.");
        this.out.println();
        this.out.println("Je bent nu in " + this.currentRoom.description);
        this.out.print("Kamers: ");
        return false;
    }

    /**
     * Print out some help information.
     * Here we print some stupid, cryptic message and a list of the 
     * command words.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     * 
     */


    printHelp(params : string[]) : boolean {
        if(params.length > 0) {
            this.out.println("Help met wat?");
            return false;
        }
         this.out.println();
        this.out.println("Welkom op het HZ");
        this.out.println("Neem een kijkje op de hogeschool zeeland.");
        this.out.println("Typ help als je hulp nodig hebt.");
        this.out.println();
        this.out.println("Je bent nu in " + this.currentRoom.description);
        this.out.print("Uitgangen: ");
        return false;
    }

    /** 
     * Try to go in one direction. If there is an exit, enter
     * the new room, otherwise print an error message.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    goRoom(params : string[]) : boolean {
        console.log(this.currentRoom.inventory[0]);
        if(params.length == 0) {
           
            // if there is no second word, we don't know where to go...
            this.out.println("Waarheen?");
            return;
        }

        let direction = params[0];

        // Try to leave current room.
        let nextRoom = null;
        switch (direction) {
            case "noord" : 
                nextRoom = this.currentRoom.northExit;
                break;
            case "oost" : 
                nextRoom = this.currentRoom.eastExit;
                break;
            case "zuid" : 
                nextRoom = this.currentRoom.southExit;
                break;
            case "west" : 
                nextRoom = this.currentRoom.westExit;
                break;
        }

        

        if (nextRoom == null) {
            this.out.println("Dit kan niet.");
        }
        else {
            this.currentRoom = nextRoom;
            this.out.println("Je nieuwe locatie is: " + this.currentRoom.description);
            for (var item of this.currentRoom.inventory)
            {
                this.out.println(String("in deze kamer ligt " + item.name));
            }
            for (var furniture of this.currentRoom.furniture)
            {
                this.out.println(String("in deze kamer staat " + furniture.name));
            }
            if(this.currentRoom.inventory[0] != null){
            }
            this.out.print("Locaties: ");
            if(this.currentRoom.northExit != null) {
                this.out.print("noord ");
            }
            if(this.currentRoom.eastExit != null) {
                this.out.print("oost ");
            }
            if(this.currentRoom.southExit != null) {
                this.out.print("zuid ");
            }
            if(this.currentRoom.westExit != null) {
                this.out.print("west ");
            }
            this.out.println();
        }
        return false;
    }

    useFurniture(params : string[]) : boolean {

         if(params.length == 0) {
            // if there is no second word, we don't know where to go...
            this.out.println("Wat gebruiken?");
            return;
        }

        let furnitureWord = params[0];

        for (var furniture of this.currentRoom.furniture)
        {
            if (furniture.name == furnitureWord)
            {
                furniture.useFurniture(this);
            }
        }

        return false;
    }
    
    /** 
     * "Quit" was entered. Check the rest of the command to see
     * whether we really quit the game.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    quit(params : string[]) : boolean {
        if(params.length > 0) {
            this.out.println("Stop met wat?");
            return false;
        }
        else {
            return true;  // signal that we want to quit
        }
    }
}