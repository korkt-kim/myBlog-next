import styled from 'styled-components';
import {useEffect} from 'react';
import {useRouter} from 'next/router';

const Container = styled.div`
  padding-top:55px;
`

export default function Callback(){
  const router = useRouter();
  useEffect(() => {
    setTimeout(()=>{
      router.push('/');
    },2000);
  }, [])
  return(
    <Container>
      <h1>Loggin in</h1>
    </Container>
  )
}