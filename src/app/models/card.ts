export class CardCredit {
    id?: string;
    headline: string;
    cardNumber: number;
    expirationDate: Date;
    securityCode: number;
    createDate: Date;
    refreshDate: Date;

    constructor(headline: string, cardNumber: number, securityCode: number, expirationDate: Date) {
        this.headline = headline;
        this.cardNumber = cardNumber;
        this.securityCode = securityCode;
        this.createDate = new Date();
        this.refreshDate = new Date();
        this.expirationDate = new Date();
    }
}