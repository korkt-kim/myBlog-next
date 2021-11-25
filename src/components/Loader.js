import Image from 'next/image';
import styled from 'styled-components';
import {useRouter} from 'next/router'
import {useState,useEffect} from 'react';


const Container = styled.div`
  z-index:100;
  width:100%;
  height:100%;
  position:fixed;
  left:0;
  top:0;
  background-color:rgba(0,0,0,0.9);

  .loading-wrapper{
    width:15%;
    height:auto;
    position:fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    @media (max-width:768px){
      min-width:50%;
      height:auto;
    }
  }
`

export default function Loader(){
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const handleStart = (url) => {
        return (url !== router.asPath) && setLoading(true)
      };
      const handleComplete = (url) => {
        return (url !== router.asPath) && setLoading(false)
      };

      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)

      return () => {
          router.events.off('routeChangeStart', handleStart)
          router.events.off('routeChangeComplete', handleComplete)
          router.events.off('routeChangeError', handleComplete)
      }
  })
  return(
    <section>
      {loading&&<Container>
        <div className="loading-wrapper">
          <Image src="/images/loading.gif" alt="loading" width={10} height={5} layout="responsive"/>
        </div> 
      </Container>}
    </section>
  )  
}