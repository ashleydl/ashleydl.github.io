class Portfolio extends Item
{
    grade = 10;

    constructor(name: string, description: string, grade: number) { 
        super(name, description);
        this.grade = grade;
    }
}