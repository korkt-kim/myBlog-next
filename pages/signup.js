import styled from 'styled-components'
import {Icon} from 'semantic-ui-react';
import { useState,useEffect } from 'react';

import { useDispatch,useSelector } from 'react-redux';
import {signup,googleLogin} from'../store/modules/auth'
import {Auth} from 'aws-amplify'
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth/lib/types'


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
  background:${props=>props.type==='error' ? 'orange':'greenyellow'};
  border:5px solid ${props=>props.type==='error' ? 'red':'green'};
  font-weight:500;
  padding:0.5rem;
  min-width:29rem;
  font-size:1.5rem;
`

export default function SignUp(){
  const dispatch = useDispatch();
  const {loading,hasError,user} = useSelector((state)=>state.auth)

  const [requested,setRequested] = useState(false);
  const [message,setMessage] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  
  useEffect(()=>{
    if(!requested || loading) return;
    setMessage(hasError ? hasError: `verification mail has been sent to ${email}`)
  },[requested,loading,hasError])

  useEffect(()=>{
    // if(user) router.push('/');
  },[user])

  return(
    <Container>
      <h1>SignUp</h1>
      {message && <Message type={hasError ? 'error' : 'fulfilled'}>{message}</Message>}
      <form onSubmit={(e)=>{
        e.preventDefault();
        setRequested(true);
        dispatch(signup({email,password,name}));
      }}>
        <input type="text" placeholder="id" onChange={(e)=>setEmail(e.target.value)}></input>
        <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}></input>
        <input type="name" placeholder="name" onChange={(e)=>setName(e.target.value)}></input>
        <input type="submit" value="SignUp"></input>
      </form>
      <GoogleButton onClick={(e)=>{
        e.preventDefault();
        Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})
      }}><Icon name="google"></Icon>SignUp With Google</GoogleButton>
    </Container>
  )
}

export async function getStaticProps(){
  return{
    props:{}
  }
}