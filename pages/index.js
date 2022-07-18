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
import Link from 'next/link'

import { db, storage } from '../firebase'
import { ref, uploadString, getDownloadURL, uploadBytes } from "firebase/storage";
import RecommendedAds from '../components/Ads/RecommendedAds';
import StoryThumbnail from '../components/StoryThumbnail';
import Stories from '../components/Stories';

export default function Home({ finalDataArray, pagination_nav_pages, currentPage }) {

  const { setcurrentLocation } = useContext(videosContext);

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
    fetch('/api/revalidate')

  }, []);


  return (
    <div className='w-full' >
      <Head>
        <title>Free Desi kahani | Hindi sex story audio - हिंदी सेक्स कहानियाँ</title>
        <meta name="description"
          content="Free Desi kahani Sex Stories, Antarvasna video, Antarvasna audio, Devar bhabhi sex story, Jija saali sex stories, desi sex story." />

      </Head>


      <main className="flex ">
        <div className='w-full'>
          <h1 className="text-center font-light text-sb font-hindi text-[22px] font-md md:text-[30px] rounded-lg  md:px-24 py-3 shadow-md ">
          Free Desi kahani Sex Stories - अन्तर्वासना की हॉट हिंदी सेक्स कहानियाँ
          </h1>




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
                  <Link key={page} href={`/page/${page.substring(page.indexOf('Page') + 4, page.length)}`}>
                    <a>
                      <p
                        className={`${currentPage === parseInt(page.substring(page.indexOf('Page') + 4, page.length)) ? "bg-orange-200" : ""} px-1 cursor-pointer sm:p-2 ml-1  border-2 border-orange-800 mb-1  hover:bg-orange-200 rounded `} >
                        {page.substring(page.indexOf('Page') + 4, page.length)}
                      </p>
                    </a>
                  </Link>

                )
              }
              else {
                return (
                  <Link key={page} href={page.includes('Next') ? `/page/${parseInt(currentPage) + 1}` : `/page/${currentPage - 1}`}>
                    <a>
                      <p className={`px-1 cursor-pointer sm:p-2 ml-1  border-2 border-orange-800 mb-1 hover:bg-orange-200 rounded `} >
                        {page}
                      </p>
                    </a>
                  </Link>

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
