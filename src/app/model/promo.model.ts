export class Promo{
    public id: number;
    public code: string;
    public discount_in_percentage: number;

    constructor(id: number, code: string, discount_in_percentage: number) {
        this.id = id;
        this.code = code;
        this.discount_in_percentage = discount_in_percentage;
    }
}