import React from 'react'
import cheerio from 'cheerio';
import fetchdata from 'node-fetch';
import Stories from '../../components/Stories';
import { useRouter } from 'next/router'
import Head from 'next/head'


function Author({ finalDataArray, categoryTitle, categoryDescription, pagination_nav_pages, currentPage, }) {

    const router = useRouter()

    return (
        <div>
            <p className='text-xl font-semibold m-2 mx-4  md:text-2xl'>{`
लेखक :${categoryTitle}`}</p>
            <p className='text-lg font-medium m-2 mx-4 md:text-xl '>{categoryDescription}</p>
            <p className='text-lg text-right font-medium m-2 mx-4 md:text-xl '>{`PAGE : 1`}</p>
            <Stories stories={finalDataArray} />


            {/* PAGINATION */}
            {/* <div className='flex justify-center items-center flex-wrap text-black'>
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
                                router.push(`/author/${CategoryHref}/page/${page.substring(page.AuthorOf('Page') + 4, page.length)}`)

                            }}
                                className={`${currentPage === parseInt(page.substring(page.AuthorOf('Page') + 4, page.length)) ? "bg-orange-200" : ""} px-1 cursor-pointer sm:p-2 ml-1  border-2 border-orange-800 mb-1  hover:bg-orange-200 rounded `} >
                                {page.substring(page.AuthorOf('Page') + 4, page.length)}
                            </p>
                        )
                    }
                    else {
                        return (
                            <p onClick={() => {
                                if (page.includes('Next')) {
                                    router.push(`/author/${CategoryHref}/page/${currentPage + 1}`)
                                } else {
                                    router.push(`/author/${CategoryHref}/page/${currentPage - 1}`)
                                }

                            }} key={page} className={`px-1 cursor-pointer sm:p-2 ml-1  border-2 border-orange-800 mb-1 hover:bg-orange-200 rounded `} >
                                {page}
                            </p>
                        )
                    }

                })}


            </div> */}


        </div>
    )
}

export default Author



export async function getServerSideProps(context) {


    const { author } = context.params



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

        for (let Author = 0; Author < authorName.length; Author++) {
            authorArray.push({ name: authorName[Author], href: authorHref[Author] })
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

    


        for (let Author = 0; Author < TitleArray.length; Author++) {

            finalDataArray.push({
                Title: TitleArray[Author],
                author: authorArray[Author],
                date: dateArray[Author],
                views: viewsArray[Author],
                description: descriptionArray[Author] ? descriptionArray[Author] : "",
                href: hrefArray[Author],
                tags: tagsArray[Author],

            })
        }

    }


    await scrape(`https://www.freesexkahani.com/author/${author}`)


    return {
        props: {
            finalDataArray: finalDataArray,
            categoryTitle: categoryTitle,
            categoryDescription: categoryDescription,
            pagination_nav_pages: pagination_nav_pages,
            currentPage: 1
        }
    }


}
