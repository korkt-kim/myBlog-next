import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import Footer from '../src/components/Footer.js'
import Top from '../src/components/Top.js'
import Loader from '../src/components/Loader.js'

import { wrapper } from "../store";

import Amplify,{ API } from 'aws-amplify';
import config from '../src/aws-exports';
import AuthProvider from '../src/provider/AuthProvider'
API.configure(config);
Amplify.configure(config);



function MyApp({ Component, pageProps }) {
  return(
    <div>
      <AuthProvider>
        <Loader></Loader>
        <Top></Top>
        <Component {...pageProps} />
        <Footer ></Footer>
      </AuthProvider>
    </div>
  ) 
}
 
export default wrapper.withRedux(MyApp);
