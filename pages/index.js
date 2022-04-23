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

export default function Home({ finalDataArray, pagination_nav_pages,currentPage }) {
  console.log(finalDataArray);
  console.log(pagination_nav_pages);
  
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


          <Stories stories={finalDataArray} />




          {/* PAGINATION */}
          <div className='flex justify-center items-center flex-wrap text-black'>
            {pagination_nav_pages.map(page => {

              if (page.includes('…')) {
                return (
                  <p key={page} className={`px-1 sm:p-2 ml-1  border-2 border-orange-800 mb-1 hover:bg-orange-200 rounded `} >
                    {page}
                  </p>
                )
              }
              if (page.includes('Page')) {
                return (
                  <p key={page} onClick={() => {
                    router.push(`/page/${page.substring(page.indexOf('Page') + 4, page.length)}`)

                  }}
                    className={`${currentPage === parseInt(page.substring(page.indexOf('Page') + 4, page.length)) ? "bg-orange-200" : ""} px-1 cursor-pointer sm:p-2 ml-1  border-2 border-orange-800 mb-1  hover:bg-orange-200 rounded `} >
                    {page.substring(page.indexOf('Page') + 4, page.length)}
                  </p>
                )
              }
              else {
                return (
                  <p onClick={() => {
                    if (page.includes('Next')) {
                      router.push(`/page/${currentPage + 1}`)
                    } else {
                      router.push(`/page/${currentPage - 1}`)
                    }

                  }} key={page} className={`px-1 cursor-pointer sm:p-2 ml-1  border-2 border-orange-800 mb-1 hover:bg-orange-200 rounded `} >
                    {page}
                  </p>
                )
              }

            })}


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
