import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import Footer from '../src/components/Footer.js'
import Top from '../src/components/Top.js'
import Loader from '../src/components/Loader.js'


function MyApp({ Component, pageProps }) {
  return(
    <div>
      <Loader></Loader>
      <Top></Top>
      <Component {...pageProps} />
      <Footer ></Footer>
    </div>
  ) 
}
 
export default MyApp
