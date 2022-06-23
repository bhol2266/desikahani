import React from 'react'
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import fetchdata from 'node-fetch';
import Stories from '../../../../components/Stories';
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';


function Category({ finalDataArray, categoryTitle, categoryDescription, pagination_nav_pages, currentPage, CategoryHref }) {

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
                <meta property="og:url" content={`https://www.desikahaniya.in/category/${categoryTitle}/page/${currentPage}`} />
                <meta property="og:site_name" content="Free Hindi Sex Stories" />


                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${categoryTitle}- Free Hindi Sex Stories`} />
                <meta name="twitter:description"
                    content={`${categoryDescription}`} />
                <meta name="twitter:label1" content="पोस्ट" />
                <meta name="twitter:data1" content="85" />
            </Head>
            <h1 className='text-xl font-semibold m-2 mx-4  md:text-2xl font-inter'>{`Category :${categoryTitle}`}</h1>
            <p className='text-lg  m-2 mx-4 md:text-xl font-light text-sb font-hindi'>{categoryDescription}</p>
            <p className='text-lg text-right font-medium m-2 mx-4 md:text-xl '>{`PAGE : ${currentPage}`}</p>
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
                            <Link key={page} href={`/category/${CategoryHref}/page/${page.substring(page.indexOf('Page') + 4, page.length)}`}>
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
                            <Link key={page} href={page.includes('Next') ? `/category/${CategoryHref}/page/${parseInt(currentPage) + 1}` : `/category/${CategoryHref}/page/${currentPage - 1}`}>
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

export default Category


export async function getStaticPaths() {
    const categories = [

        {
            category_title: 'Aunty Sex Story',
            href: 'aunty-sex'
        },

        {
            category_title: 'Bhabhi Sex',
            href: 'bhabhi-sex'
        },
        {
            category_title: 'Desi Kahani',
            href: 'desi-kahani'
        },

        {
            category_title: 'Family Sex Stories',
            href: 'family-sex-stories'
        },
        {
            category_title: 'First Time Sex',
            href: 'first-time-sex'
        },
        {
            category_title: 'Gay Sex Stories In Hindi',
            href: 'gay-sex-story-hindi'
        },
        {
            category_title: 'Group Sex Stories',
            href: 'group-sex-stories'
        },
        {
            category_title: 'Indian Sex Stories',
            href: 'indian-sex-stories'
        },
        {
            category_title: 'Sali Sex',
            href: 'sali-sex'
        },
        {
            category_title: 'Teacher Sex',
            href: 'teacher-sex'
        },
        {
            category_title: 'Teenage Girl',
            href: 'teenage-girl'
        },
        {
            category_title: 'XXX Kahani',
            href: 'xxx-kahani'
        },
        {
            category_title: 'अन्तर्वासना',
            href: 'antarvasna'
        },
        {
            category_title: 'हिंदी सेक्स स्टोरीज',
            href: 'hindi-sex-stories'
        },

    ]

    var arrayPaths = []

    for (let index = 0; index < categories.length; index++) {
        arrayPaths.push({ params: { category: categories[index].href, page: '1' } })
    }
    return {

        paths: arrayPaths,
        fallback: true // false or 'blocking'
    };
}


export async function getStaticProps(context) {


    const { category, page } = context.params



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


    await scrape(`https://www.freesexkahani.com/category/${category}/page/${page}`)


    return {
        props: {
            finalDataArray: finalDataArray,
            categoryTitle: categoryTitle,
            categoryDescription: categoryDescription,
            pagination_nav_pages: pagination_nav_pages,
            currentPage: parseInt(page),
            CategoryHref: category
        }
    }


}
