import {PersonneFactory} from "../../model/PersonneFactory";
import { setPersonnesList, addPersonne } from "../actions/PersonneActions"
import { Dispatch } from "redux";

let _urlPersonneList : string = "http://localhost:8081/v1/person";
let _urlAddPersonne : string = "";

import { RootState } from '../store';

export const getPersoneList = () => {
    // @ts-ignore
    return async (dispatch, getState) => {
        try {
            console.log("Je rentre dans le getPersonneList:");
            const state = getState() as RootState;
            console.log("J'ai passé le stat:");

            console.log("Je fais le call API");
            let response;
            try {
                response = await fetch(_urlPersonneList, {
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im8tWEpRYkVvaG14TzNEWFU5MGJlZCJ9.eyJpc3MiOiJodHRwczovL2Rldi0zamE3M3dwZnAxajZ1emVkLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJlQWY4ejR2UzNCNDdMR2F0VG4zNHEzOElSZEpyTk52Y0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90b3hpYXBpLyIsImlhdCI6MTcxNzM1MjYyMiwiZXhwIjoxNzE3NDM5MDIyLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJlQWY4ejR2UzNCNDdMR2F0VG4zNHEzOElSZEpyTk52YyJ9.aSLqTgwS1i3acV2xLlccnFuWsoUinFExcQhKFvVvQ1DnCnzpvwT19PaHqqPz2UJ1rbr-pOT34qiL0bz3WzqEzUo0dg6g6rLDsNwKNOeJc-uWX29h7BJVBdYCwNaGl7bfM0lji_xU3qqZcGD2lsld0JNJQXCLfW6ly3TCUOfjsEKnkCBldDfZmjYBv4ShTHNNC_jL5WqEp6dNy6ALyLcn9CWOeyGLECgviFcyPiVzeKtkU0uTKqJ9_gYAA569MHSgSFIXcK_LDTgkEDk4C1dvy0bZOCAwcLQGo3hRFo5VF_ZUYekP_KZlfUg2enCMTz0eK8Vkzw_6yFWYLKkszu3arw"
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (fetchError) {
                console.error("Erreur lors de la requête fetch:", fetchError);
                throw fetchError; // Propager l'erreur pour qu'elle soit capturée par le catch externe
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


export const postPersonne = (name : string, image : string, onSucces : () => void) => {
    // @ts-ignore
    return async(dispatch : Dispatch, getState) => {
        try {
            const state = getState() as RootState;
            const token = state.token;

            const response = await fetch(_urlAddPersonne, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body : JSON.stringify(
                    {
                        name,
                        image
                    }
                )
            });
    
            if (response.ok) {
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