import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {API} from 'aws-amplify';

export const initialState = {
  categories:[],
  loading:false,
  hasError:false
}

export const fetchCategories = createAsyncThunk('blog/fetchCategories',async(_,{rejectWithValue})=>{
  try{  
    const response = await API.get('blognextapi','/blog/category');
    return response;
  }catch(e){
    return rejectWithValue(e.message)
  }
  
})


const blogSlice = createSlice({ // action과 reducer를 한번에 정의한다.
  name:'blog',
  initialState,
  reducers:{
    getCategories: (state,action)=>{
      state.categories=action.payload
    }
  },
  extraReducers:{
    [fetchCategories.fulfilled] : (state,{payload})=>{
      state.categories = payload;
      state.loading=false;
      state.hasError=false;
    },
    [fetchCategories.pending]: state=>{
      state.loading=true;
    },
    [fetchCategories.rejected]:(state,{payload})=>{
      state.hasError = payload;
      state.loading=false;
    }
  }
})

export const categories =(state) => state.categories;
export default blogSlice.reducer;