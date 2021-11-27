import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {checkUser} from '../../store/modules/auth'


export default function AuthProvider({children}){
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkUser());
  },[])

  return (<React.Fragment>
    {children}
    </React.Fragment>)
  
}