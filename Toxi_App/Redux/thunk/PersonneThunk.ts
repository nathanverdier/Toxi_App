import {getToken } from './TokenThunk';
import {PersonneFactory} from "../../model/PersonneFactory";
import { setPersonnesList, addPersonne } from "../actions/PersonneActions"

let _urlPersonneList : string = "https://codefirst.iut.uca.fr/containers/ToxiTeam-toxi-api/v1/person";

export const getPersoneList = () => {
    // @ts-ignore
    return async (dispatch) => {
        try {
            const token = await getToken();
            console.log("Token récupérer après le call API All Personne:", token);
            console.log("Je fais le call API");
            let response;
            try {
                response = await fetch(_urlPersonneList, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token?.getTokenString(),
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (fetchError) {
                console.error("Erreur lors de la requête fetch:", fetchError);
                throw fetchError;
            }

            console.log("Response de fetch:", response);
            const PersonneListJson = await response.json();
            console.log("PersonneListJson:", PersonneListJson);
            const PersonneList = PersonneFactory.createPersonnes(JSON.stringify(PersonneListJson));
            console.log("PersonneList:", PersonneList);

            dispatch(setPersonnesList(PersonneList));
        } catch (error) {
            console.error("Error lors du call API getPersonneList", error);
        }
    };
};

const convertImageToBase64 = async (imageUri: string): Promise<string | null> => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Erreur lors de la conversion de l'image en base64", error);
      return null;
    }
  };

export const postPersonne = (name : string, image : string, onSucces : () => void) => {
    // @ts-ignore
    return async(dispatch) => {
        try {
            const token = await getToken();
            console.log("Token récupérer après le call API All Personne:", token);
            console.log("Je fais le call API");
    
            let imageOnApi = await convertImageToBase64(image);
            // Extraire la partie base64 de l'image
            const base64Pattern = /^data:image\/[a-z]+;base64,/;
            imageOnApi = imageOnApi!.replace(base64Pattern, "");
    
            const response = await fetch(_urlPersonneList, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + token?.getTokenString(),
                },
                body : JSON.stringify(
                    {
                        name,
                        image: imageOnApi,
                    }
                )
            });
            console.log("Response de fetch:", response);
            if (response.ok) {
                console.log("Personne ajouté avec succès");
                dispatch(addPersonne(name, image))
                // @ts-ignore
                dispatch(getPersoneList())
                onSucces();
            } else {
                throw new Error("Erreur lors de l'ajout d'une personne !")
            }
        } catch (error) {
            console.log('Error lors du call API postPersonne : ', error)
        }
    }
}