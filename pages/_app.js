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
Amplify.configure({...config, ssr: true});



function MyApp({ Component, pageProps,categories }) {
  return(
    <div>
      <AuthProvider>
          <Loader></Loader>
          <Top categories={categories}></Top>
          <Component {...pageProps} />
          <Footer ></Footer>
      </AuthProvider>
    </div>
  ) 
}
 

MyApp.getInitialProps = async () => {
  const categories = await API.get('blognextapi','/blog/category');
  return {categories}
}

export default wrapper.withRedux(MyApp);
