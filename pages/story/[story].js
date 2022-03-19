import React from 'react'
import { useRouter } from 'next/router'
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import fetchdata from 'node-fetch';
import Head from 'next/head'
import {
    PencilAltIcon, EyeIcon
} from '@heroicons/react/solid';
// import fs from 'fs';


function story({ story_details }) {

    console.log(story_details.audiolink);


    return (
        <div className=" p-4 bg-orange-100 border-2 border-gray-400 m-2 shadow rounded-lg "  >
            <Head>
                <meta name="referrer" content="no-referrer" />
            </Head>
            <p className='text-xl font-semibold text-red-700 cursor-pointer hover:text-green-800  '>{story_details.Title}</p>
            <div className='flex items-center text-sm  my-2 space-x-2'>

                <div className='flex  items-center '>
                    <PencilAltIcon className='icon text-red-500' />
                    <p className='font-semibold text-gray-600' >{story_details.author}</p>
                </div>
                <p className='font-semibold text-gray-600'>{story_details.date}</p>

                <div className='flex items-center'>
                    <EyeIcon className='icon text-blue-500' />
                    <p className='font-semibold text-gray-600'>{story_details.views}</p>
                </div>
            </div>

            {story_details.audiolink &&

                <audio className='w-full sm:w-4/5 md:w-2/5 p-1 bg-gray-500 rounded-full my-2' src={story_details.audiolink} controls />
            }


            {story_details.description.map(p => {
                return (
                    <p className='font-semibold text-gray-800 text-md' key={p}>
                        {p}
                    </p>
                )
            })}







        </div>
    )
}

export default story


export async function getServerSideProps(context) {


    const { link } = context.query

    var story_details = {}
    const scrape = async (url) => {



        var Title = ''
        var author = ''
        var date = ''
        var views = ''
        var description = []
        var audiolink = ''


        const response = await fetchdata(url)
        const body = await response.text();
        const $ = cheerio.load(body)

        // fs.writeFileSync(`Home.html`, body);




        $('.entry-title').each((i, el) => {

            const data = $(el).text()
            Title = data

        })
        $('.author-name').each((i, el) => {

            const data = $(el).text()
            author = data
        })


        $('.posted-on time').each((i, el) => {

            const data = $(el).text()
            date = data

        })


        $('.post-views-eye').each((i, el) => {

            const data = $(el).text()
            views = data
        })

        $('.entry-content p').each((i, el) => {
            const data = $(el).text()
            description.push(data)

        })

        $('.wp-audio-shortcode source').each((i, el) => {
            const data = $(el).attr('src')
            audiolink = data

        })



        story_details = {
            Title: Title,
            author: author,
            date: date,
            views: views,
            description: description,
            audiolink: audiolink != null ? audiolink : ''
        }

    }



    await scrape(link)
    // await scrape('https://www.freesexkahani.com/antarvasna/gang-bang-porn-story/')




    return {
        props: {
            story_details: story_details
        }
    }


}
