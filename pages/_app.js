import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Footer from '../src/components/Footer.js'
import Top from '../src/components/Top.js'
import styled from 'styled-components';
import Router from 'next/router';
import Loader from '../src/components/Loader.js'

const StyledFooter = styled(Footer)`
  position:fixed;
  bottom:0;
`

function MyApp({ Component, pageProps }) {
  
  return(
    <div>
      <Loader></Loader>
      <Top></Top>
      <Component {...pageProps} />
      <StyledFooter ></StyledFooter>
    </div>
  ) 
  
  
}
 
export default MyApp
