import cheerio from 'cheerio';
import fetchdata from 'node-fetch';
import React, { useState } from 'react';
import BannerAds from '../../components/Ads/BannerAds';
import Outstreams from '../../components/Ads/Outstream';
import videosContext from '../../context/videos/videosContext';
import { useContext, useEffect } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
    XIcon
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Head from 'next/head'

function Album({ dload_links }) {

    const context = useContext(videosContext);
    const { setdisclaimerShow, } = context;

    const [showBigImage, setshowBigImage] = useState(false)
    const [BigImageURL, setBigImageURL] = useState('')

    const router = useRouter();
    const { photoAlbum } = router.query;

    var title;
    if (photoAlbum) {
        try {

            title = photoAlbum.trim().replaceAll("-", " ")
        } catch (error) {

        }
    }




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
                <title>{photoAlbum.replace(/-/g, " ")}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                <meta name="description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />


                <meta property="og:title" content={photoAlbum.replace(/-/g, " ")} />
                <meta property="og:description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta property="og:url" content={`https://www.desikahaniya.in/photo/${photoAlbum}`} />
                <meta property="og:site_name" content="Free Hindi Sex Stories" />


                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={photoAlbum.replace(/-/g, " ")} />
                <meta name="twitter:description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta name="twitter:label1" content="पोस्ट" />
                <meta name="twitter:data1" content="85" />
            </Head>

            {/* <BannerAds /> */}
            {/* <Outstreams /> */}

            <div className='flex flex-col'>


                <h1 className={` font-semibold text-md sm:text-lg md:text-2xl text-center p-1 mx-4`}>{title}</h1>

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

export async function getStaticPaths() {

    var pathsArray = []
    for (let index = 1; index <= 50; index++) {

        var pics = require(`../../JsonData/pics/page${index}.json`)
        pics.map(pic => {
            pathsArray.push({ params: { photoAlbum: pic.substring(pic.indexOf(".co/") + 4, pic.length - 1) } }
            )
        })

    }
    return {
        paths: pathsArray,
        fallback: false // false or 'blocking'
    };
}










export async function getStaticProps(context) {

    const { photoAlbum } = context.params;
    var dataArray = []



    async function scrape() {

        const response = await fetchdata(`https://hotdesipics.co/${photoAlbum}`)
        const body = await response.text();

        const $ = cheerio.load(body)

        console.log(photoAlbum)

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


