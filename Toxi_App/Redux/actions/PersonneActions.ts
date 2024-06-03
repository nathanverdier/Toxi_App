import {Personne} from "../../model/Personne";

export enum ActionTypes {
    FETCH_PERSONNES = 'FETCH_PERSONNES',
    FETCH_ADD_PERSONNE = 'FETCH_ADD_PERSONNE'
}

interface actionFetch {
    type: ActionTypes.FETCH_PERSONNES | ActionTypes.FETCH_ADD_PERSONNE,
    payload: Personne[]
}

export type Action = actionFetch

export const setPersonnesList = (personnesList : Personne[]) : Action => {
    return {
        type: ActionTypes.FETCH_PERSONNES,
        payload: personnesList
    }
}

export const addPersonne = (name : string, image : string) => {
    return {
        type: ActionTypes.FETCH_ADD_PERSONNE,
        payload: name, image,
    }
}

