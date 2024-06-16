import { Token } from './Token';

export class TokenFactory {

    public static createToken(jsonObject: string) : Token {
        let data: any = JSON.parse(jsonObject);

        // Création du Token avec les valeurs
        const token: Token = new Token(
            data.access_token,
            data.expires_in,
            data.token_type,
        );

        return token;
    }
}