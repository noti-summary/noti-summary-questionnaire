
import Head from 'next/head'
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '../components/context/authContext';
import Bar from '../components/appBar';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Head>
        <title>Noti-Summary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Bar />
      <Component {...pageProps} />
      <ToastContainer />
    </AuthContextProvider>
  )
}

export default MyApp
