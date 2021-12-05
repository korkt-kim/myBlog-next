import styled from 'styled-components'
import {Icon} from 'semantic-ui-react';
import { useState } from 'react';

import { useDispatch,useSelector } from 'react-redux';
import {cognitoLogin,googleLogin} from '../store/modules/auth'
import { useEffect } from 'react';
import {useRouter} from 'next/router';


const Container = styled.div`
  height:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  form{
    width:29rem;
    display:flex;
    flex-direction:column;
    >*{
      margin:1rem 0;
    }
    input{
      font-size: 1rem;
      padding: 0.75rem 1rem;
      border: 2px solid #dedede;
      border-radius: 0.5rem;
      box-shadow: none;
      box-sizing: border-box;
      &[type="submit"]{
        cursor:pointer;
      }
    }
  }
`
const GoogleButton = styled.div`
  background:red;
  border-radius:40px;
  display:inline-box;
  padding:1rem;
  cursor:pointer;
  font-size:1rem;   
`
const Message = styled.div`
  background: orange;
  border:5px solid red;
  font-weight:500;
  padding:0.5rem;
  min-width:29rem;
  font-size:1.5rem;
`

export default function SignIn(){
  const dispatch = useDispatch();
  const router = useRouter();
  const {hasError,loading,user} = useSelector((state)=>state.auth);
  const [requested,setRequested]  = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  
  useEffect(()=>{
    if(!requested || loading )return;
    
    setErrorMessage(hasError);
  },[hasError,loading])

  useEffect(()=>{
    if(user) router.push('/');
  },[user])

  return(
    <Container>
      <h1>SignIn</h1>
      {errorMessage&& <Message>{errorMessage}</Message>}
      <form onSubmit={(e)=>{
        e.preventDefault();
        setRequested(true);
        dispatch(cognitoLogin({email,password}));
      }}>
        <input type="text" placeholder="id" onChange = {(e)=>{setEmail(e.target.value)}}></input>
        <input type="password" placeholder="password" onChange = {(e)=>{setPassword(e.target.value)}}></input>
        <input type="submit" value="SignIn"></input>
      </form>
      <GoogleButton onClick={()=>dispatch(googleLogin())}><Icon name="google"></Icon>SignIn With Google</GoogleButton>
    </Container>
  )
}

export async function getStaticProps(){
  return{
    props:{}
  }
}