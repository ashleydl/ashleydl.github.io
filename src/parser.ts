/**
 * This class is part of the "Zorld of Wuul" application. 
 * "Zorld of Wuul" is a very simple, text based adventure game.  
 * 
 * This parser reads user input and tries to interpret it as an "Adventure"
 * command. Every time it is called it reads a line from the terminal and
 * tries to interpret the line as a two word command. 
 *
 * The parser has a set of known command words. It checks user input against
 * the known commands, and invokes a relevant method on the Game object.
 * 
 * @author  Michael Kölling, David J. Barnes and Bugslayer
 * @version 2017.03.30
 */
class Parser {
    input : HTMLInputElement;
    game : Game;


    /**
     * Creates the parser object.
     * 
     * @param game the game object to prse commands for
     * @param input the HTMLInputElement to parse the value from
     */
    constructor(game: Game, input : HTMLInputElement) {
        this.game = game;
        this.input = input;
        input.onkeyup = (e) => { // event handler function
            if (e.keyCode == 13 && this.game.isOn) {
                // Invoke parse method wehen user pressed enter. 
                let command = this.input.value;
                this.game.out.println(command);
                this.parse(command.split(" "));
                this.input.value = ""; // clears the input element 
                this.game.out.print(">");
            } 
        }
    }

    /**
     * Parses the specified words and invokes the corresponding method
     * on the game object.
     * 
     * @param words an array of words to parse
     * Maak een verzameling van de commando's. Geef een commando bij het woordje go bijvoorbeeld. Go room. Als het niet in de verzameling zit, 
     * gebruik dan default. De player roept de parse aan go west. Zo ben je het switch statement kwijt. 
     * 
     * if words[0] == "")
     * {
     * return
     * Do nothing when user enters noting
     * }
     * 
     * let command: Command:
     * command = this.commands[words[0]]
     * AL die commands zijn subklasses van command. Dan weet de parser dat er een methode is execute. Wat er vervolgens gebeurd is dat de methode
     * van die specifieke classe go word aangeroepen. Jouw browser weet dat het geen command is maar een subklasse van command. En dat hij die moet uitvoeren.
     * 
     * if (command == nul)
     * {
     * command = this.default;
     * }
     * 
     * 
     *
     * 
     */
    parse(words : string[]) : void {
        let wantToQuit = false;
        let params = words.slice(1);
        switch (words[0]) {
            case "" :
                // Do nothing when user enters nothing 
                break
            case "help" : 
                wantToQuit = this.game.printHelp(params);
                break;
            case "ga" :
                wantToQuit = this.game.goRoom(params);
                break;
            case "gebruik" :
                wantToQuit = this.game.useFurniture(params);
                break;
            case "quit" : 
                wantToQuit = this.game.quit(params);
                break;
            default :
                // print an error when command is not known
                wantToQuit = this.game.printError(params);

        }
        if (wantToQuit) {
            this.input.disabled = true;
            this.game.gameOver();
        }
    }

}