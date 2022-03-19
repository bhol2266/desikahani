import Script from 'next/script'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import VideoState from '../context/videos/VideoState'
import '../styles/globals.css'
import '../styles/nProgress.css'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'

function MyApp({ Component, pageProps }) {

  Router.events.on("routeChangeStart", (url) => {
    console.log('routeChangeStart');
    NProgress.start();

  })
  Router.events.on("routeChangeComplete", (url) => {
    console.log('routeChangeComplete');
    NProgress.done();
  })


  return (
    <>

      <Head>
        <title>Desi Porn</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      </Head>

      <VideoState>

        <Navbar />
        <div className=''>
          <Component {...pageProps} />
        </div>
        <hr />
        <Footer />
      </VideoState>
    </>
  )
}

export default MyApp
