import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {Auth} from 'aws-amplify';

const initialState = {
  user:null,
  loading:false,
  hasError:false,
}

export const cognitoLogin = createAsyncThunk('auth/cognitoLogin',async (userData,{rejectWithValue}) =>{
  try{
    const {email,password} = userData;
    const user=  await Auth.signIn(email,password);
    return user;
  }catch(e){
    return rejectWithValue(e.message);
  }
  
})

export const googleLogin = createAsyncThunk('auth/googleLogin',async(_,{rejectWithValue})=>{
  try{
    const user = await Auth.federatedSignIn({provider:'Google'});
    return user;
  }catch(e){
    return rejectWithValue(e.message);
  }
})

export const signup = createAsyncThunk('auth/signup',async(userData,{ rejectWithValue })=>{
  try{
    const {email,password,name}  = userData;
    const user= await Auth.signUp({
      username:email,
      password,
      attributes:{
          name
      }
    });
    return user;
  }catch(e){
    return rejectWithValue(e.message);
  }
  
})

export const checkUser = createAsyncThunk('auth/checkUser',async(_,{rejectWithValue})=>{
  try{
    const user = await Auth.currentAuthenticatedUser();
    return user;
  }catch(e){
    return rejectWithValue(e)
  }
  
})

export const signout = createAsyncThunk('auth/logout',async(_,rejectWithValue)=>{
  try{
    await Auth.signOut();
  }catch(e){
    return rejectWithValue(e.message);
  }
  
})

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    getUser:(state,action)=>{
      state.user=action.payload;
    }
  },
  extraReducers:{
    [cognitoLogin.fulfilled]: (state,{payload})=>{
      state.user= payload;
      state.loading=false;
      state.hasError=false;
    },
    [cognitoLogin.pending]: (state)=>{
      state.loading=true;
    },
    [cognitoLogin.rejected]: (state,{payload})=>{
      state.loading=false;
      state.hasError=payload;
    },
    [googleLogin.fulfilled]: (state,{payload})=>{
      state.user=payload;
      state.loading=false;
      state.hasError=false;
    },
    [signup.fulfilled]: (state)=>{
      state.loading=false;
      state.hasError=false;
    },
    [signup.pending]:(state)=>{
      state.loading=true;
    },
    [signup.rejected]:(state,{payload})=>{
      state.loading=false;
      state.hasError=payload;
    },
    [checkUser.fulfilled] : (state,{payload})=>{
      state.user= payload;
      state.loading=false;
      state.hasError=false;
    },
    [checkUser.pending]: (state)=>{
      state.loading=true;
    },
    [checkUser.rejected]: (state,{payload})=>{
      state.loading=false;
      state.hasError=payload;
    },
    [signout.fulfilled]: state=>{
      state.user= null;
      state.loading=false;
      state.hasError=false;
    }
  }
})

export const user = (state)=>state.user;
export default authSlice.reducer;