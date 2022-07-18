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
        <meta name='asg_verification' content='vVcWCcbbgmnqv221hpAjPojb' />
        <meta name="exoclick-site-verification" content="6b1112fe173bdf782d96975e70bd4b95"></meta>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charset="UTF-8" />
      </Head>


      <VideoState>

        <Navbar />
        <div className='flex lg:w-11/12 lg:mx-auto mt-1 md:mt-3  mx-2 md:mx-4'>
          <Sidebar />
          <Component {...pageProps} />
        </div>
        <hr />
        <Footer />
      </VideoState>
    </>
  )
}

export default MyApp
