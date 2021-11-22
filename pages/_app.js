import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Footer from '../src/components/Footer.js'
import Top from '../src/components/Top.js'
import styled from 'styled-components';

const StyledFooter = styled(Footer)`
  position:fixed;
  bottom:0;
`

function MyApp({ Component, pageProps }) {
  return(
    <div>
      <Top></Top>
      <Component {...pageProps} />
      <StyledFooter ></StyledFooter>
    </div>
  ) 
  
  
}
 
export default MyApp
