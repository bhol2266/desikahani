import React from 'react'
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import fetchdata from 'node-fetch';
import Stories from '../../components/Stories';
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';


function Page({ finalDataArray, categoryTitle, categoryDescription, pagination_nav_pages, currentPage, CategoryHref }) {

    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'red'} />
            </div>
        )
    }


    return (
        <div>
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
    )
}

export default Page


export async function getStaticPaths() {

    return {

        paths: [
            { params: { page: '2' } }
        ],
        fallback: true // false or 'blocking'
    };
}


export async function getStaticProps(context) {


    const { page } = context.params



    var finalDataArray = []
    var pagination_nav_pages = []
    const scrape = async (url) => {

        var TitleArray = []
        var dateArray = []
        var viewsArray = []
        var descriptionArray = []
        var hrefArray = []
        var tagsArray = []
        var authorArray = []

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


    await scrape(`https://www.freesexkahani.com/page/${page}`)


    return {
        props: {
            finalDataArray: finalDataArray,
            pagination_nav_pages: pagination_nav_pages,
            currentPage: parseInt(page),
        }
    }


}
