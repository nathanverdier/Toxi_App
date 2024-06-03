import {Personne} from "../../model/Personne";
import {Action, ActionTypes} from "../actions/PersonneActions";

interface State {
    personnes : Personne[]
}

const initialState = {
    personnes: [],
    addPersonne : new Personne("","Inconnu", "FEUR"),
}

const appReducerPersonne = (state : State = initialState, action : Action) => {
    switch (action.type) {
        case ActionTypes.FETCH_PERSONNES:
            return {
                ...state,
                personnes : action.payload
            }
        case ActionTypes.FETCH_ADD_PERSONNE:
            return {
                ...state,
                addPersonne : action.payload
            }
        default:
            return state
    }
}

export default appReducerPersonne