import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import blog from './blog';
import auth from './auth';

const reducer = (state,action)=>{
  if(action.type===HYDRATE){ //SSR 작업시 HYDRATE라는 액션을 통해 서버의 스토어와 클라이언트의 스토어를 합쳐준다
    return{
      ...state,
      ...action.payload
    };
  }
  return combineReducers({
    blog,
    auth
  })(state,action);

}

export default reducer;