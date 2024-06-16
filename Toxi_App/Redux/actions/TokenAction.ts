import { Token } from '@/model/Token';

export enum ActionTypes {
    FETCH_TOKEN = 'FETCH_TOKEN',
}

interface actionFetch {
    type: ActionTypes.FETCH_TOKEN,
    payload: Token
}

export type Action = actionFetch

export const setToken = (token : Token) : Action => {
    return {
        type: ActionTypes.FETCH_TOKEN,
        payload: token
    }
}