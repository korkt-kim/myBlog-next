import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import Footer from '../src/components/Footer.js'
import Top from '../src/components/Top.js'
import Loader from '../src/components/Loader.js'

import { wrapper } from "../store";

import Amplify,{ API } from 'aws-amplify';
import config from '../src/aws-exports';
API.configure(config);
Amplify.configure(config);



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
 
export default wrapper.withRedux(MyApp);
