// @ts-ignore
import { configureStore } from '@reduxjs/toolkit';
import personneReducer from './reducers/PersonneReducer';
import tokenReducer from './reducers/TokenReducer';

const reducer = {
  personne : personneReducer,
  token : tokenReducer
}

const store = configureStore({
  // @ts-ignore
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;