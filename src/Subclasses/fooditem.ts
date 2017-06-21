class FoodItem extends Item
{
    calorien = 0;

    constructor(name: string, description: string, calorien: number) {
        super(name, description);
        this.calorien = calorien;
    }
}