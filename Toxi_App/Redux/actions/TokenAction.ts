// @ts-ignore
import { createAction } from '@reduxjs/toolkit';

export const setToken = createAction<string>('token/set');
export const clearToken = createAction('token/clear');