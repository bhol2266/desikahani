import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'


import Sidebar from '../components/Sidebar';
import Videos from '../components/Stories';
import React from 'react'

import videosContext from '../context/videos/videosContext'

import { db, storage } from '../firebase'
import { ref, uploadString, getDownloadURL, uploadBytes } from "firebase/storage";
import RecommendedAds from '../components/Ads/RecommendedAds';
import StoryThumbnail from '../components/StoryThumbnail';
import Stories from '../components/Stories';

export default function Home() {
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
        <title>Desikahani - Hindi Sex Stories</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="flex ">
        <div>
          <p className="text-center text-xl font-semibold rounded-lg border-2 border-gray-300 shadow-md p-2 m-1 bg-orange-100">
            अन्तर्वासना की हॉट हिंदी सेक्स कहानियाँ
          </p>


          <p className='font-bold sm:text-2xl text-green-900  text-center p-1 pr-6'>{`PAGE :${currentPageNumberURL}`}</p>

          <Stories stories={stories} />


          {/* PAGINATION */}
          <div className='flex justify-center items-center flex-wrap'>

            <button onClick={() => { setcurrentPageNumberURL(currentPageNumberURL - 1); scrollTop() }} className={`${currentPageNumberURL === 1 ? "hidden" : ""}  text-sm sm:text-med border-2 sm:mx-4 border-gray-500 rounded bg-red-500 p-1 m-1 text-white hover:bg-red-700`}>Previous</button>

            {pages.map((pagenumber, index) => {

              return (
                <p key={pagenumber} onClick={() => { setcurrentPageNumberURL(pagenumber); scrollTop() }} className={`${pagenumber === currentPageNumberURL ? "bg-yellow-200 px-3" : "px-1"}  sm:p-2 ml-1  border-2 border-red-600 mb-1 hover:bg-red-200 rounded cursor-pointer `} >
                  {pagenumber}
                </p>

              )
            })}


            <button onClick={() => { setcurrentPageNumberURL(currentPageNumberURL + 1); scrollTop() }} className={`${currentPageNumberURL === parseInt(pages[pages.length - 2]) ? "hidden" : ""}  text-sm sm:text-med ml-1 border-2 sm:mx-4  border-gray-500 rounded bg-red-500 p-4 pt-1 pb-1 text-white hover:bg-red-700`}>Next</button>

          </div>
        </div>
      </main>

      <footer >
        {/* <RecommendedAds /> */}


      </footer>
    </div>
  )
}


