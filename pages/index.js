import { Headers } from 'node-fetch';
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import fetchdata from 'node-fetch';
import Sidebar from '../components/Sidebar';
import Videos from '../components/Stories';
import React from 'react'

import videosContext from '../context/videos/videosContext'

import { db, storage } from '../firebase'
import { ref, uploadString, getDownloadURL, uploadBytes } from "firebase/storage";
import RecommendedAds from '../components/Ads/RecommendedAds';
import StoryThumbnail from '../components/StoryThumbnail';
import Stories from '../components/Stories';

export default function Home({ finalDataArray,pagination_nav_pages }) {
  console.log(finalDataArray);
  console.log(pagination_nav_pages);
  //Scroll to top
  const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  var stories = []
  const { setcurrentLocation } = useContext(videosContext);

  const [currentPageNumberURL, setcurrentPageNumberURL] = useState(1)
  var pages = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
    34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
    45, 46, 47, 48, 49, 50
  ]

  stories = require(`../JsonData/stories/stories${currentPageNumberURL.toString()}.json`)

  useEffect(() => {
    async function fetchData() {
      var location = {}
      if (!localStorage.getItem("location") === null) {
        setcurrentLocation(location)
      }
      else {
        try {
          const response = await fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0')
          location = await response.json()

        } catch (error) {
          try {
            const response = await fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0')
            location = await response.json()

          } catch (error) {
            location = { country_name: 'india' }
          }
        }
        setcurrentLocation(location)
        localStorage.setItem("location", JSON.stringify(location))
      }
    }

    fetchData()
  }, []);


  return (
    <div >
      <Head>
        <title>Hindi Sex Stories - Antarvasna - हिंदी सेक्स कहानियाँ</title>
        <meta name="description"
          content="[Official Antarvasna] New best Hindi Sex Stories for free, Indian sexy stories daily of hot girls, bhabhi and aunties. रोज नई नई गर्मागर्म सेक्सी कहानियाँ असली अन्तर्वासना साईट पर." />
        <link rel="icon" href="/favicon.ico" />

        <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
        <meta property="og:locale" content="hi_IN" />
        <meta property="og:type" content="article" />

        <meta property="og:title" content="Hindi Sex Stories - Antarvasna - हिंदी सेक्स कहानियाँ" />
        <meta property="og:description"
          content="[Official Antarvasna] New best Hindi Sex Stories for free, Indian sexy stories daily of hot girls, bhabhi and aunties. रोज नई नई गर्मागर्म सेक्सी कहानियाँ असली अन्तर्वासना साईट पर." />
        <meta property="og:url" content="https://www.desikahaniya.in/" />
        <meta property="og:site_name" content="Free Hindi Sex Stories" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hindi Sex Stories - Antarvasna - हिंदी सेक्स कहानियाँ" />
        <meta name="twitter:description"
          content="[Official Antarvasna] New best Hindi Sex Stories for free, Indian sexy stories daily of hot girls, bhabhi and aunties. रोज नई नई गर्मागर्म सेक्सी कहानियाँ असली अन्तर्वासना साईट पर." />
        <meta name="twitter:label1" content="पोस्ट" />
        <meta name="twitter:data1" content="85" />
      </Head>


      <main className="flex ">
        <div>
          <h1 className="text-center text-xl font-semibold rounded-lg border-2 border-gray-300 shadow-md p-2 m-1 bg-orange-100">
            अन्तर्वासना की हॉट हिंदी सेक्स कहानियाँ
          </h1>


          <p className='font-bold sm:text-2xl text-green-900  text-center p-1 pr-6'>{`PAGE :${currentPageNumberURL}`}</p>

          <Stories stories={stories} />


          {/* PAGINATION */}
          <div className='flex justify-center items-center flex-wrap'>

            <button onClick={() => { setcurrentPageNumberURL(currentPageNumberURL - 1); scrollTop() }} className={`${currentPageNumberURL === 1 ? "hidden" : ""}  text-sm sm:text-med border-2 sm:mx-4 border-gray-500 rounded bg-orange-300 p-1 m-1 text-black  hover:bg-orange-500`}>Previous</button>

            {pages.map((pagenumber, index) => {

              return (
                <p key={pagenumber} onClick={() => { setcurrentPageNumberURL(pagenumber); scrollTop() }} className={`${pagenumber === currentPageNumberURL ? "bg-orange-200 px-3" : "px-1"}  sm:p-2 ml-1  border-2 border-orange-800 mb-1 hover:bg-orange-200 rounded cursor-pointer `} >
                  {pagenumber}
                </p>

              )
            })}


            <button onClick={() => { setcurrentPageNumberURL(currentPageNumberURL + 1); scrollTop() }} className={`${currentPageNumberURL === parseInt(pages[pages.length - 2]) ? "hidden" : ""}  text-sm sm:text-med ml-1 border-2 sm:mx-4  border-gray-500 rounded bg-orange-300  m-1 text-black hover:bg-orange-500 p-4 pt-1 pb-1 `}>Next</button>

          </div>
        </div>
      </main>

      <footer >
        {/* <RecommendedAds /> */}


      </footer>
    </div>
  )
}


export async function getStaticProps() {


  var finalDataArray = []
  var categoryTitle = ''
  var categoryDescription = ''
  var pagination_nav_pages = []
  var bodyy = null

  const scrape = async (url) => {

    var TitleArray = []
    var dateArray = []
    var viewsArray = []
    var descriptionArray = []
    var hrefArray = []
    var tagsArray = []
    var authorArray = []


    const meta = {
      'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"
    }
    const header = new Headers(meta)



    const response = await fetchdata(url)
    const body = await response.text();
    const $ = cheerio.load(body)




    $('.entry-title a').each((i, el) => {



      const data = $(el).text()
      const href = $(el).attr("href")
      TitleArray.push(data)
      hrefArray.push(href)

    })



    //Author name and link
    var authorName = []
    var authorHref = []
    $('.author-name').each((i, el) => {
      const data = $(el).text()
      authorName.push(data)

    })

    $('.url.fn.n').each((i, el) => {
      const data = $(el).attr('href')
      authorHref.push(data)
    })

    for (let index = 0; index < authorName.length; index++) {
      authorArray.push({ name: authorName[index], href: authorHref[index] })
    }



    $('.posted-on time').each((i, el) => {
      const data = $(el).text()
      dateArray.push(data)

    })


    $('.post-views-eye').each((i, el) => {

      const data = $(el).text()
      viewsArray.push(data)

    })
    $('.entry-content p:nth-child(1)').each((i, el) => {

      const data = $(el).text()
      descriptionArray.push(data)

    })
    $('.tags-links').each((i, el) => {

      var array = []

      const select = cheerio.load(el)
      select('a').each((i, el) => {
        const data = $(el).text()
        const href = $(el).attr('href')
        array.push({ name: data, href: href })

      })
      tagsArray.push(array)

    })

    $('.page-title').each((i, el) => {

      const data = $(el).text()
      categoryTitle = data

    })

    $('.taxonomy-description  p:nth-child(1)').each((i, el) => {

      const data = $(el).text()
      categoryDescription = data

    })


    $('.nav-links').children().each((i, el) => {

      const data = $(el).text()
      pagination_nav_pages.push(data)
    })




    for (let index = 0; index < TitleArray.length; index++) {

      finalDataArray.push({
        Title: TitleArray[index],
        author: authorArray[index],
        date: dateArray[index],
        views: viewsArray[index],
        description: descriptionArray[index] ? descriptionArray[index] : "",
        href: hrefArray[index],
        tags: tagsArray[index],

      })
    }


  }


  await scrape(`https://www.freesexkahani.com/page/1/`)


  return {
    props: {
      finalDataArray: finalDataArray,
      pagination_nav_pages: pagination_nav_pages,
      currentPage: 1,
    }
  }


}
