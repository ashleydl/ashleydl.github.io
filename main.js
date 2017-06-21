var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Furniture = (function () {
    function Furniture(name, description) {
        this.name = name;
        this.description = description;
    }
    Furniture.prototype.useFurniture = function (game) {
        game.out.println("Je gebruikte de " + this.name);
    };
    return Furniture;
}());
var Game = (function () {
    function Game(output, input) {
        this.charInv = [];
        this.items = [];
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.createRooms();
        this.printWelcome();
    }
    Game.prototype.createRooms = function () {
        var itroom = new Room("de ICT ruimte");
        var helpdesk = new Room("aan de receptie");
        var firstfloor = new Room("op de 1e verdieping");
        var groundfloor = new Room("op de begaande grond");
        var teacherroom = new Room("in de lerarenkamer");
        var printroom = new Room("bij de printer");
        var interoffice = new Room("bij de international office");
        var atrium = new Room("in het atrium");
        var av = new Room("AV dienst");
        var basement = new Room("de kelder");
        av.setInventory(new Item("engelsportfolio", "Engelsportfolio"));
        printroom.setFurniture(new CanonPrinter("canonPrinter", "Dit is een printer"));
        printroom.setInventory(new Item("portfolio", "Voor ontwerpen"));
        interoffice.setInventory(new Item("minor", "in het buitenland een minor volgen"));
        itroom.setExits(teacherroom, printroom, firstfloor, null);
        helpdesk.setExits(null, av, basement, null);
        basement.setExits(null, null, helpdesk, null);
        firstfloor.setExits(itroom, interoffice, groundfloor, null);
        interoffice.setExits(null, firstfloor, null, null);
        groundfloor.setExits(null, helpdesk, atrium, null);
        atrium.setExits(null, groundfloor, null, null);
        teacherroom.setExits(null, null, itroom, null);
        av.setExits(null, helpdesk, null, null);
        printroom.setExits(null, itroom, null, null);
        this.currentRoom = itroom;
    };
    Game.prototype.printWelcome = function () {
        this.out.println();
        this.out.println("Welkom op het HZ");
        this.out.println("Typ het woord ga en dan de richting waar je heen wilt");
        this.out.println();
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
    };
    Game.prototype.gameOver = function () {
        this.isOn = false;
        this.out.println("Je hebt je diploma niet kunnen halen, probeer het opnieuw. ");
        this.out.println("Druk F5 om game te herstarten");
    };
    Game.prototype.printError = function (params) {
        this.out.println("Typ help als je hulp nodig hebt. Begin elke zin met ga.");
        this.out.println();
        this.out.println("Je bent nu in " + this.currentRoom.description);
        this.out.print("Kamers: ");
        return false;
    };
    Game.prototype.printHelp = function (params) {
        if (params.length > 0) {
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
    };
    Game.prototype.goRoom = function (params) {
        console.log(this.currentRoom.inventory[0]);
        if (params.length == 0) {
            this.out.println("Waarheen?");
            return;
        }
        var direction = params[0];
        var nextRoom = null;
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
            this.out.println("Dit kan niet.");
        }
        else {
            this.currentRoom = nextRoom;
            this.out.println("Je nieuwe locatie is: " + this.currentRoom.description);
            for (var _i = 0, _a = this.currentRoom.inventory; _i < _a.length; _i++) {
                var item = _a[_i];
                this.out.println(String("in deze kamer ligt " + item.name));
            }
            for (var _b = 0, _c = this.currentRoom.furniture; _b < _c.length; _b++) {
                var furniture = _c[_b];
                this.out.println(String("in deze kamer staat " + furniture.name));
            }
            if (this.currentRoom.inventory[0] != null) {
            }
            this.out.print("Locaties: ");
            if (this.currentRoom.northExit != null) {
                this.out.print("noord ");
            }
            if (this.currentRoom.eastExit != null) {
                this.out.print("oost ");
            }
            if (this.currentRoom.southExit != null) {
                this.out.print("zuid ");
            }
            if (this.currentRoom.westExit != null) {
                this.out.print("west ");
            }
            this.out.println();
        }
        return false;
    };
    Game.prototype.useFurniture = function (params) {
        if (params.length == 0) {
            this.out.println("Wat gebruiken?");
            return;
        }
        var furnitureWord = params[0];
        for (var _i = 0, _a = this.currentRoom.furniture; _i < _a.length; _i++) {
            var furniture = _a[_i];
            if (furniture.name == furnitureWord) {
                furniture.useFurniture(this);
            }
        }
        return false;
    };
    Game.prototype.quit = function (params) {
        if (params.length > 0) {
            this.out.println("Stop met wat?");
            return false;
        }
        else {
            return true;
        }
    };
    return Game;
}());
var Item = (function () {
    function Item(name, description) {
        this.name = name;
        this.description = description;
    }
    return Item;
}());
var Parser = (function () {
    function Parser(game, input) {
        var _this = this;
        this.game = game;
        this.input = input;
        input.onkeyup = function (e) {
            if (e.keyCode == 13 && _this.game.isOn) {
                var command = _this.input.value;
                _this.game.out.println(command);
                _this.parse(command.split(" "));
                _this.input.value = "";
                _this.game.out.print(">");
            }
        };
    }
    Parser.prototype.parse = function (words) {
        var wantToQuit = false;
        var params = words.slice(1);
        switch (words[0]) {
            case "":
                break;
            case "help":
                wantToQuit = this.game.printHelp(params);
                break;
            case "ga":
                wantToQuit = this.game.goRoom(params);
                break;
            case "gebruik":
                wantToQuit = this.game.useFurniture(params);
                break;
            case "quit":
                wantToQuit = this.game.quit(params);
                break;
            default:
                wantToQuit = this.game.printError(params);
        }
        if (wantToQuit) {
            this.input.disabled = true;
            this.game.gameOver();
        }
    };
    return Parser;
}());
var Printer = (function () {
    function Printer(output) {
        this.output = output;
    }
    Printer.prototype.print = function (text) {
        this.output.innerHTML += text;
    };
    Printer.prototype.println = function (text) {
        if (text === void 0) { text = ""; }
        this.print(text + "<br/>");
        this.output.scrollTop = this.output.scrollHeight;
    };
    return Printer;
}());
var Room = (function () {
    function Room(description) {
        this.inventory = [];
        this.furniture = [];
        this.description = description;
    }
    Room.prototype.setExits = function (north, east, south, west) {
        if (north != null) {
            this.northExit = north;
        }
        if (east != null) {
            this.eastExit = east;
        }
        if (south != null) {
            this.southExit = south;
        }
        if (west != null) {
            this.westExit = west;
        }
    };
    Room.prototype.setInventory = function (item) {
        this.inventory.push(item);
    };
    Room.prototype.setFurniture = function (furniture) {
        this.furniture.push(furniture);
    };
    return Room;
}());
var CanonPrinter = (function (_super) {
    __extends(CanonPrinter, _super);
    function CanonPrinter(name, description) {
        return _super.call(this, name, description) || this;
    }
    CanonPrinter.prototype.useFurniture = function (game) {
        game.out.println("Portfolio uitgeprint! Beschrijving: " + this.description);
        game.charInv.push(new Item("Geprint Portfolio", "Vers uit de printer"));
    };
    return CanonPrinter;
}(Furniture));
var FoodItem = (function (_super) {
    __extends(FoodItem, _super);
    function FoodItem(name, description, calorien) {
        var _this = _super.call(this, name, description) || this;
        _this.calorien = 0;
        _this.calorien = calorien;
        return _this;
    }
    return FoodItem;
}(Item));
var minor = (function (_super) {
    __extends(minor, _super);
    function minor(name, description) {
        return _super.call(this, name, description) || this;
    }
    return minor;
}(Item));
var Portfolio = (function (_super) {
    __extends(Portfolio, _super);
    function Portfolio(name, description, grade) {
        var _this = _super.call(this, name, description) || this;
        _this.grade = 10;
        _this.grade = grade;
        return _this;
    }
    return Portfolio;
}(Item));
