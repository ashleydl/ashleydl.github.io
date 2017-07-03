class Printer {
    output : HTMLElement;

    /**
     * Creates the printer object for the specified HTMLElement.
     * 
     * @param output the HTMLElement to outpu to
     */
    constructor(output : HTMLElement) {
        this.output = output;
    }

    /**
     * Adds the specified text to the output.
     * 
     * @param text the text to add to the output
     */
    print(text : string) : void {
         this.output.innerHTML += text;       
    }

    /**
     * Adds the specified text followed by a newline designator (<br/>).
     * 
     * @param text optional the line of text to add to the output
     */
    println(text="") : void {
         this.print(text + "<br/>");
         this.output.scrollTop = this.output.scrollHeight;       
    }

}