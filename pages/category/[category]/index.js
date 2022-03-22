import React from 'react'
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import fetchdata from 'node-fetch';
import Stories from '../../../components/Stories';
import { useRouter } from 'next/router'


function Index({ finalDataArray, categoryTitle, categoryDescription, pagination_nav_pages, currentPage, CategoryHref }) {

    const router = useRouter()

    return (
        <div>
            <p className='text-xl font-semibold m-2 mx-4  md:text-2xl'>{`Category :${categoryTitle}`}</p>
            <p className='text-lg font-medium m-2 mx-4 md:text-xl '>{categoryDescription}</p>
            <p className='text-lg text-right font-medium m-2 mx-4 md:text-xl '>{`PAGE : 1`}</p>
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
                                router.push(`/category/${CategoryHref}/page/${page.substring(page.indexOf('Page') + 4, page.length)}`)

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
                                    router.push(`/category/${CategoryHref}/page/${currentPage + 1}`)
                                } else {
                                    router.push(`/category/${CategoryHref}/page/${currentPage - 1}`)
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


export async function getServerSideProps(context) {


    const { category } = context.query

   

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
        var author_link = []
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
        $('.url.fn.n').each((i, el) => {

            const data = $(el).attr('href')
            author_link.push(data)

            const select = cheerio.load(el)
            select('span').each((i, el) => {
                const data = $(el).text()
                authorArray.push(data)
            })

        })



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
                array.push(data)

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
                author_link: author_link[index],
                date: dateArray[index],
                views: viewsArray[index],
                description: descriptionArray[index] ? descriptionArray[index] : "",
                href: hrefArray[index],
                tags: tagsArray[index],

            })
        }

    }


    await scrape(`https://www.freesexkahani.com/category/${category}/page/1`)


    return {
        props: {
            finalDataArray: finalDataArray,
            categoryTitle: categoryTitle,
            categoryDescription: categoryDescription,
            pagination_nav_pages: pagination_nav_pages,
            CategoryHref: category,
            currentPage:1
        }
    }


}