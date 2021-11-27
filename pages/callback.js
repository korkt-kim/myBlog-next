import styled from 'styled-components';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import { checkUser } from '../store/modules/auth';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  padding-top:55px;
`

export default function Callback(){
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    setTimeout(()=>{
      router.push('/');
    },500);
    dispatch(checkUser());
  }, [])
  return(
    <Container>
      <h1>Loggin in</h1>
    </Container>
  )
}