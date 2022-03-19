import React from 'react'
import { useRouter } from 'next/router'
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import fetchdata from 'node-fetch';
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'

import {
    PencilAltIcon, EyeIcon, FilterIcon,ScaleIcon
} from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react'



function story({ story_details }) {


    const [fontSize, setfontSize] = useState('lg')

    const filter = [{ sizeName: 'Small', sizecode: 'sm' }, { sizeName: 'Medium', sizecode: 'md' }, { sizeName: 'Large', sizecode: 'lg' }, { sizeName: 'XL', sizecode: 'xl' },{ sizeName: '2XL', sizecode: '2xl' },]

    const fontSizeChangerOnclick = (sizeCode) => {
        setfontSize(sizeCode)
    }

    return (
        <div className="md:w-3/5 p-4 bg-orange-100 border-2 border-gray-400 m-2 shadow rounded-lg "  >
            <Head>
                <meta name="referrer" content="no-referrer" />
            </Head>
            <div className='flex items-center justify-between'>

                <p className='text-xl md:text-2xl font-semibold text-red-700 cursor-pointer hover:text-green-800  '>{story_details.Title}</p>
                <Menu as="div" className={` relative  text-left  md:scale-125 `}>
                    <div className=' w-fit'>
                        <Menu.Button className="inline-flex justify-center cursor-pointer  w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Text Size
                            <img className='ml-2' src='https://cdn-icons.flaticon.com/png/512/2043/premium/2043488.png?token=exp=1647712043~hmac=80017e50d71fb76634fd067d627f6063' alt='loading' height={16} width={16}></img>
                        </Menu.Button>
                        <p className='text-gray-700 block px-4 text-sm font-semibold hover:bg-green-200 hover:text-red-500'
                        >
                        </p>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className=" z-50 origin-top-right absolute left-0 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                            {filter.map(item => {
                                return (
                                    <Menu.Item key={item.sizeName}  >
                                        {({ active }) => (
                                            <p onClick={() => { fontSizeChangerOnclick(item.sizecode) }} className={` px-4 py-2 text-xs md:text-sm font-semibold hover:bg-green-200 hover:text-red-500 cursor-pointer ${fontSize === item.sizecode ? "text-red-500" : ""}`}
                                            >
                                                {item.sizeName}
                                            </p>
                                        )}
                                    </Menu.Item>



                                )
                            })}



                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
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

                <audio className='w-full md:w-4/5 lg:w-2/5 p-1 bg-gray-500 rounded-full my-2' src={story_details.audiolink} controls />
            }


            {story_details.description.map(p => {
                return (
                    <p className={`text-gray-800 text-${fontSize}`} key={p}>
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
