import cheerio from 'cheerio';
import fetchdata from 'node-fetch';
import React, { useState } from 'react';
import BannerAds from '../../../components/Ads/BannerAds';
import Outstreams from '../../../components/Ads/Outstream';
import videosContext from '../../../context/videos/videosContext';
import { useContext, useEffect } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
    XIcon
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Link from 'next/link'
function Album({ dload_links }) {

    const context = useContext(videosContext);
    const { setdisclaimerShow, } = context;

    const [showBigImage, setshowBigImage] = useState(false)
    const [BigImageURL, setBigImageURL] = useState('')

    const router = useRouter();
    const { album } = router.query;

    var title;
    if (album) {
        try {

            title = album.trim().replaceAll("-", " ")
        } catch (error) {

        }
    }


    useEffect(() => {




        if (localStorage.getItem("disclaimerShow") === "false") {
            console.log(localStorage.getItem("disclaimerShow"));
            setdisclaimerShow(false)
        }
    }, [])




    const displaypics = dload_links.map((picData, index) => {

        return (
            <>
                <div key={picData} onClick={() => { setBigImageURL(picData); setshowBigImage(true) }} className={` mb-2 animate-fade flex   flex-col justify-center  cursor-pointer  shadow-md  border-2 rounded-lg overflow-hidden	 md:hover:scale-105 transform transition duration-150 bg-white`}>
                    <img
                        loading="lazy"
                        alt={"loading"}
                        src={picData}
                        height={1080}
                        width={1920}
                    ></img>
                </div>



            </>
        )
    })


    return (

        <>
            <Head>
                <title>{album.replace(/-/g, " ")}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

            </Head>
            {/* <BannerAds /> */}
            {/* <Outstreams /> */}

            <div className='flex flex-col'>


                <p className={` font-semibold text-md sm:text-lg md:text-2xl text-center p-1 mx-4`}>{title}</p>

                <div className={`${!showBigImage ? "" : "hidden"} grid grid-cols-2 p-1 sm:grid-cols-1 gap-x-1  md:grid-cols-3 lg:grid-cols-4 space-x-2 space-y-4  `}>

                    {displaypics}

                </div>
                <div onClick={() => { setshowBigImage(false) }} className={`${showBigImage ? "" : "hidden"}`}>
                    <img
                        className='object-contain h-fit mx-auto'
                        loading="lazy"
                        alt={"loading"}
                        src={BigImageURL}
                    ></img>
                </div>

            </div>



        </>
    )
}


export default Album











export async function getServerSideProps(context) {

    const { album } = context.query;
    var dataArray = []



    async function scrape() {

        const response = await fetchdata(`https://hotdesipics.co/${album}`)
        const body = await response.text();

        const $ = cheerio.load(body)

        console.log(album)

        $('.gallery-item  a').each(async (i, el) => {
            const links = $(el).attr("href")
            dataArray.push(links);

        })

    }

    await scrape()


    return {
        props: {
            dload_links: dataArray
        }
    }
}


