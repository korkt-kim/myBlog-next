import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {API} from 'aws-amplify';

export const initialState = {
  categories:[],
  // loading:false,
  // hasError:false
}


const blogSlice = createSlice({ // action과 reducer를 한번에 정의한다.
  name:'blog',
  initialState,
  reducers:{
    setCategories: (state,action)=>{
      state.categories=action.payload.categories
    }
  },
  // extraReducers:{
  //   [fetchCategories.fulfilled] : (state,{payload})=>{
  //     state.categories = payload;
  //     state.loading=false;
  //     state.hasError=false;
  //   },
  //   [fetchCategories.pending]: state=>{
  //     state.loading=true;
  //   },
  //   [fetchCategories.rejected]:(state,{payload})=>{
  //     state.hasError = payload;
  //     state.loading=false;
  //   }
  // }
})

export const categories =(state) => state.categories;
export const { setCategories } = blogSlice.actions;
export default blogSlice.reducer;