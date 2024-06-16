export class Token {
    tokenString: string;
    tokenTime: number;
    tokenType: string;

    constructor(firstString: string, intValue: number, secondString: string) {
        this.tokenString = firstString;
        this.tokenTime = intValue;
        this.tokenType = secondString;
    }

    public getTokenString(): string {
        return this.tokenString;
    }

    public getTokenTime(): number {
        return this.tokenTime;
    }

    public getTokenType(): string {
        return this.tokenType;
    }

    
}