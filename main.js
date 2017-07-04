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
        var interoffice = new Room("in de international office");
        var atrium = new Room("in het atrium");
        var av = new Room("AV dienst");
        var basement = new Room("de kelder");
        av.addRoomObject(new avcamera("avcamera", "dit is de camera van de avdienst"));
        printroom.addRoomObject(new CanonPrinter("printer", "Dit is een Canon Printer"));
        helpdesk.setInventory(new Item("reservering", "om een lokaal te huren"));
        interoffice.addRoomObject(new bureau("bureau", "hier vind je alles voor het buitenland", "Clarissa"));
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
        this.currentRoom = itroom;
    };
    Game.prototype.printWelcome = function () {
        this.out.println();
        this.out.println("Welkom op het HZ");
        this.out.println("Om dit schooljaar te halen heb je bepaalde items nodig voor studiepunten.");
        this.out.println("Commando's : ga, help, pak, inleveren, gebruiken, vragen");
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
        this.out.println("De game is klaar");
        this.out.println("Druk F5 om game te herstarten");
    };
    Game.prototype.printError = function (params) {
        this.out.println("Typ help als je hulp nodig hebt. Begin elke zin met ga.");
        this.out.println();
        this.out.println("Je bent nu in " + this.currentRoom.description);
        this.out.print("Kamers: ");
        return false;
    };
    Game.prototype.getItem = function (params) {
        var removeIndex;
        for (var _i = 0, _a = this.currentRoom.inventory; _i < _a.length; _i++) {
            var item = _a[_i];
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
    };
    Game.prototype.viewItems = function (params) {
        if (this.charInv.length > 0) {
            for (var _i = 0, _a = this.charInv; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item != null) {
                    this.out.println((this.charInv.indexOf(item) + 1) + ": " + item.name);
                }
            }
        }
        else {
            this.out.println("Je hebt geen items.");
        }
        return false;
    };
    Game.prototype.printHelp = function (params) {
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
            this.out.println("Hier kun je niet heen, kies een andere optie.");
        }
        else {
            this.changeRoom(nextRoom);
        }
        return false;
    };
    Game.prototype.changeRoom = function (nextRoom) {
        this.currentRoom = nextRoom;
        this.out.println("Je nieuwe locatie is: " + this.currentRoom.description);
        for (var _i = 0, _a = this.currentRoom.inventory; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item != null) {
                this.out.println(String("in deze kamer ligt " + item.name));
            }
        }
        for (var _b = 0, _c = this.currentRoom.roomObjects; _b < _c.length; _b++) {
            var roomobject = _c[_b];
            this.out.println(String("in deze kamer staat " + roomobject.name));
        }
        this.currentRoom.printExits(this.out);
        this.out.println();
    };
    Game.prototype.usecanonprinter = function (params) {
        for (var i = 0; i < this.charInv.length; i++) {
            if (this.charInv[i].name == "minor") {
                if (params.length == 0) {
                    this.out.println("Gebruik wat?");
                }
            }
            var roomObjectWord = params[0];
            for (var _i = 0, _a = this.currentRoom.roomObjects; _i < _a.length; _i++) {
                var roomObject = _a[_i];
                if (roomObject.name == roomObjectWord) {
                    roomObject.use(this);
                    if (this.currentRoom.westExit != null) {
                        this.out.println("west: " + this.currentRoom.eastExit.description);
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
    };
    Game.prototype.useavcamera = function (params) {
        for (var i = 0; i < this.charInv.length; i++) {
            if (this.charInv[i].name == "sleutel") {
                if (params.length == 0) {
                    this.out.println("Gebruik wat?");
                }
            }
        }
        var roomObjectWord = params[0];
        for (var _i = 0, _a = this.currentRoom.roomObjects; _i < _a.length; _i++) {
            var roomObject = _a[_i];
            if (roomObject.name == roomObjectWord) {
                roomObject.use(this);
                if (this.currentRoom.westExit != null) {
                    this.out.println("west: " + this.currentRoom.westExit.description);
                }
                return false;
            }
        }
    };
    Game.prototype.useinterofficebureau = function (params) {
        for (var i = 0; i < this.charInv.length; i++) {
            if (this.charInv[i].name == "Engels") {
                if (params.length == 0) {
                    this.out.println("Gebruik wat?");
                }
            }
        }
        var roomObjectWord = params[0];
        for (var _i = 0, _a = this.currentRoom.roomObjects; _i < _a.length; _i++) {
            var roomObject = _a[_i];
            if (roomObject.name == roomObjectWord) {
                roomObject.use(this);
                if (this.currentRoom.westExit != null) {
                    this.out.println("west: " + this.currentRoom.westExit.description);
                }
                return false;
            }
        }
    };
    Game.prototype.useItem = function (params) {
        for (var i = 0; i < this.charInv.length; i++) {
            if (this.currentRoom.description == "in de lerarenkamer" && this.charInv[i].name == "Portfolio") {
                var teacherroom = new Room("in de lerarenkamer");
                teacherroom.setInventory(this.items[1]);
                this.out.println("Je levert je portfolio in");
                this.out.println("Gefeliciteerd je hebt een voldoende!");
                this.out.println("Je hebt het schooljaar overleefd en gaat door naar het volgende jaar.");
                this.currentRoom = teacherroom;
                return true;
            }
            else {
                if (this.charInv[i].name == "appel" && this.currentRoom.description == "in de lerarenkamer") {
                    this.out.println("Dankzij de ingeleverde appel krijg je een extra glimlach");
                }
            }
        }
        {
            this.out.println("Je hebt geen items, of levert ze niet op de juiste plaats in.");
            return false;
        }
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
                wantToQuit = this.game.usecanonprinter(params);
                break;
            case "gebruik":
                wantToQuit = this.game.useavcamera(params);
                break;
            case "quit":
                wantToQuit = this.game.quit(params);
                break;
            case "pak":
                wantToQuit = this.game.getItem(params);
                break;
            case "inventaris":
                wantToQuit = this.game.viewItems(params);
                break;
            case "inleveren":
                wantToQuit = this.game.useItem(params);
                break;
            case "vraag":
                wantToQuit = this.game.useinterofficebureau(params);
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
        this.roomObjects = [];
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
    Room.prototype.addRoomObject = function (roomObject) {
        this.roomObjects.push(roomObject);
    };
    Room.prototype.printExits = function (out) {
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
    };
    return Room;
}());
var RoomObject = (function () {
    function RoomObject(name, description) {
        this.name = name;
        this.description = description;
    }
    return RoomObject;
}());
var avcamera = (function (_super) {
    __extends(avcamera, _super);
    function avcamera(name, description) {
        return _super.call(this, name, "avcamera: " + description) || this;
    }
    avcamera.prototype.use = function (game) {
        game.out.println("Engels gesprek opgenomen! Dankzij de " + this.name);
        game.currentRoom.inventory.push(new Item("Engels", "opgenomen met de camera"));
        game.out.println("Je kunt nu goed engels spreken, pak de video op en haal bij de international office je minorplaats op.");
    };
    return avcamera;
}(RoomObject));
var CanonPrinter = (function (_super) {
    __extends(CanonPrinter, _super);
    function CanonPrinter(name, description) {
        return _super.call(this, name, "Printer: " + description) || this;
    }
    CanonPrinter.prototype.use = function (game) {
        game.out.println("Portfolio uitgeprint! Hij ligt in de " + this.name);
        game.currentRoom.inventory.push(new Item("Portfolio", "Vers uit de printer"));
    };
    return CanonPrinter;
}(RoomObject));
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
var bureau = (function (_super) {
    __extends(bureau, _super);
    function bureau(name, description, teacher) {
        return _super.call(this, teacher, "Clarissa " + description + name) || this;
    }
    bureau.prototype.use = function (game) {
        game.out.println("Je hebt een minor plaats gekregen! Pak hem op en ga naar de printer om je toestemming om je portfolio uit te printen!");
        game.currentRoom.inventory.push(new Item("Minor", "om naar london te gaan"));
    };
    return bureau;
}(RoomObject));
var minor = (function (_super) {
    __extends(minor, _super);
    function minor(name, description, location) {
        var _this = _super.call(this, name, description) || this;
        _this.location = "london";
        return _this;
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
var reservering = (function (_super) {
    __extends(reservering, _super);
    function reservering(name, description, location) {
        var _this = _super.call(this, name, description) || this;
        _this.location = "avdienst";
        return _this;
    }
    return reservering;
}(Item));
