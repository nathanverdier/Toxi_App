// @ts-ignore
import { createReducer } from '@reduxjs/toolkit';
import { setToken, clearToken } from '../actions/TokenAction';

// @ts-ignore
const tokenReducer = createReducer<string | null>(null, (builder) => {
  builder
    // @ts-ignore
    .addCase(setToken, (state, action) => action.payload)
    .addCase(clearToken, () => null);
});

export default tokenReducer;