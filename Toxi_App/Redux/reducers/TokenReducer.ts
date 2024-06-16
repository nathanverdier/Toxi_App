import { Token } from "@/model/Token";
import {Action, ActionTypes} from "../actions/TokenAction";


interface State {
  token : Token
}

const initialState = {
  token : new Token("", 0,"")
}

const appReducerToken = (state : State = initialState, action : Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TOKEN:
      return {
        ...state,
        token : action.payload
      }
    default:
      return state
  }
}

export default appReducerToken