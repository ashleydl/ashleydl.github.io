class reservering extends Item
{
    location: "avdienst";

    constructor(name: string, description: string, location: boolean) {
        super(name, description);
        this.location="avdienst";
    }
}