import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {createWrapper} from 'next-redux-wrapper';

import reducer from './modules';

const makeStore =(context)=> configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools:process.env.NODE_ENV !== 'production'
})

export const wrapper = createWrapper(makeStore,{
  debug: process.env.NODE_ENV !== 'production',
})