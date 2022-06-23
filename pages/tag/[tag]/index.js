import React from 'react'
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import fetchdata from 'node-fetch';
import Stories from '../../../components/Stories';
import { useRouter } from 'next/router'
import Head from 'next/head'
import { BeatLoader } from 'react-spinners';


function Index({ finalDataArray, categoryTitle, categoryDescription, pagination_nav_pages, currentPage, CategoryHref }) {

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
                <title>{`${categoryTitle}- Free Hindi Sex Stories`} </title>
                <meta name="description"
                    content={`${categoryDescription}`} />


                <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
                <meta property="og:locale" content="hi_IN" />
                <meta property="og:type" content="article" />

                <meta property="og:title" content={`${categoryTitle}- Free Hindi Sex Stories`} />
                <meta property="og:description"
                    content={`${categoryDescription}`} />
                <meta property="og:url" content={`https://www.desikahaniya.in/tag/${categoryTitle}`} />
                <meta property="og:site_name" content="Free Hindi Sex Stories" />


                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${categoryTitle}- Free Hindi Sex Stories`} />
                <meta name="twitter:description"
                    content={`${categoryDescription}`} />
                <meta name="twitter:label1" content="पोस्ट" />
                <meta name="twitter:data1" content="85" />
            </Head>
            <h1 className='text-xl font-semibold m-2 mx-4  md:text-2xl'>{`TAG :${categoryTitle}`}</h1>

            <p className='text-lg font-medium m-2 mx-4 md:text-xl font-inter'>{categoryDescription}</p>
            <p className='text-lg text-right  m-2 mx-4 md:text-xl font-light text-sb font-hindi '>{`PAGE : 1`}</p>
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
                                router.push(`/tag/${CategoryHref}/page/${page.substring(page.indexOf('Page') + 4, page.length)}`)

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
                                    router.push(`/tag/${CategoryHref}/page/${currentPage + 1}`)
                                } else {
                                    router.push(`/tag/${CategoryHref}/page/${currentPage - 1}`)
                                }

                            }} key={page} className={`px-1 cursor-pointer sm:p-2 ml-1  border-2 border-orange-800 mb-1 hover:bg-orange-200 rounded `} >
                                {page}
                            </p>
                        )
                    }

                })}


            </div>


        </div>
    )
}

export default Index

export async function getStaticPaths() {


    return {
        paths: [{
            params: {
                tag: 'hot-girl'
            }
        }],
        fallback: true // false or 'blocking'
    };
}



export async function getStaticProps(context) {


    const { tag } = context.params



    var finalDataArray = []
    var categoryTitle = ''
    var categoryDescription = ''
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


    await scrape(`https://www.freesexkahani.com/tag/${tag}/page/1`)
    console.log(`https://www.freesexkahani.com/tag/${tag}/page/1`)


    return {
        props: {
            finalDataArray: finalDataArray,
            categoryTitle: categoryTitle,
            categoryDescription: categoryDescription,
            pagination_nav_pages: pagination_nav_pages,
            CategoryHref: tag,
            currentPage: 1
        }
    }


}
