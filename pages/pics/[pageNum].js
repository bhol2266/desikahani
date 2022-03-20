import {
    ArrowLeftIcon, ArrowRightIcon
} from '@heroicons/react/solid';
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import { useRouter } from "next/router";
import fetchdata from 'node-fetch';
import { useContext, useEffect } from 'react';
import BannerAds from "../../components/Ads/BannerAds";
import Outstreams from "../../components/Ads/Outstream";
import PicsThumbnail from "../../components/PicsThumbnail";
import videosContext from '../../context/videos/videosContext';
import Link from 'next/link'
import Head from 'next/head'


function Pics({ dload_links }) {

    const context = useContext(videosContext);
    const { setdisclaimerShow, } = context;
    const router = useRouter();
    var { pageNum } = router.query

    var nextPageNumber = +pageNum + 1;
    var previousPageNumber = +pageNum - 1;






    useEffect(() => {


        if (localStorage.getItem("disclaimerShow") === "false") {
            console.log(localStorage.getItem("disclaimerShow"));
            setdisclaimerShow(false)
        }
    }, [])



    const displaypics = dload_links.map(picData => {

        return (
            <PicsThumbnail key={picData.thumbnailUrl} data={picData} />

        )
    })

    return (
        <div>

            <Head>
                <title>Leaked Pictures</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

            </Head>

            <BannerAds />


            <div className="grid grid-cols-2 p-1 sm:grid-cols-1 gap-x-1  md:grid-cols-3 lg:grid-cols-4 space-x-2 space-y-4 ">

                {displaypics}
            </div>

            <div className="flex items-center justify-center w-fit mx-auto p-1  space-x-3 mt-4 mb-4 ">
                <Link href={`/pics/${previousPageNumber}`}>
                    <a href={`/pics/${previousPageNumber}`}>
                        <ArrowLeftIcon className={`${pageNum == 1 ? "hidden" : ""}  sm:w-16 w-12 cursor-pointer hover:bg-red-700 bg-red-500 rounded-lg  text-white`} />
                    </a>
                </Link>

                <Link href={`/pics/${nextPageNumber}`}>
                    <a >
                        <ArrowRightIcon className={`${pageNum == 60 ? "hidden" : ""}  sm:w-16 w-12 cursor-pointer hover:bg-red-700 bg-red-500 rounded-lg  text-white`} />

                    </a>
                </Link>
            </div>


            <BannerAds />
            <Outstreams />


        </div>
    )
}

export default Pics



export async function getServerSideProps(context) {

    const { pageNum } = context.query;
    var dataObject = []


    const scrape = async (url) => {

        var thumbnailArray = []
        var TitleArray = []
        var DateArray = []
        var errorIndex = []
        var FullalbumLink = []

        const response = await fetchdata(url)
        const body = await response.text();
        const $ = cheerio.load(body)



        $('.entry-thumbnail img').each((i, el) => {

            const links = $(el).attr("data-lazy-srcset")
            try {
                let urls = extractUrls(links);
                thumbnailArray.push(urls[0].trim())
            } catch (error) {
                errorIndex.push(i)
            }

        })


        $('.entry-title a').each((i, el) => {

            TitleArray.push($(el).text().trim());
        })

        $('.entry-date').each((i, el) => {

            DateArray.push($(el).text().trim())

        })
        $('.entry-thumbnail').each((i, el) => {

            FullalbumLink.push($(el).attr('href'))

        })



        if (errorIndex.length > 0) {
            for (let index = 0; index < errorIndex.length; index++) {

                delete TitleArray[errorIndex[index]]
                delete DateArray[errorIndex[index]]
                delete FullalbumLink[errorIndex[index]]

            }
        }


        TitleArray = TitleArray.filter(function (element) {
            return element !== undefined;
        });
        DateArray = DateArray.filter(function (element) {
            return element !== undefined;
        });
        FullalbumLink = FullalbumLink.filter(function (element) {
            return element !== undefined;
        });


        for (let index = 0; index < thumbnailArray.length; index++) {
            dataObject.push({
                thumbnailUrl: thumbnailArray[index],
                title: TitleArray[index],
                dataAdded: DateArray[index],
                nextLink: FullalbumLink[index],
            })
        }

    }

    await scrape(`https://hotdesipics.co/main/page/${pageNum}/`)
    console.log(`https://hotdesipics.co/main/page/${pageNum}/`);


    return {
        props: {
            dload_links: dataObject,
        }
    }
}

