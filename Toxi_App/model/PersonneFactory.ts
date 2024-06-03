import { Personne } from "./Personne";

export class PersonneFactory {
    public static createPersonnes( jsonArray: string) : Personne[] {
    
        let tab: Personne[] = [];
        let data: any = JSON.parse(jsonArray);
    
        for (const obj of data) {
            const personne: Personne = new Personne(
                obj.id,
                obj.name,
                obj.image            
            );
            tab.push(personne);
        }
        return tab;
    }

    public static createPersonne (jsonObject : string) : Personne {
        let data: any = JSON.parse(jsonObject);

        const personne: Personne = new Personne(
            data.id,
            data.name,
            data.image
        );
        return personne;
    }
}