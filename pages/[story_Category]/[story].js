import React from 'react'
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import fetchdata from 'node-fetch';
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'


import {
    PencilAltIcon, EyeIcon, ChevronRightIcon, ScaleIcon, FolderIcon, TagIcon
} from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react'
import { BeatLoader } from 'react-spinners';



function Story({ story_details }) {

    const [fontSize, setfontSize] = useState('lg')

    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'red'} />
            </div>
        )
    }

    const { story, story_Category } = router.query;

    const filter = [{ sizeName: 'Small', sizecode: 'sm' }, { sizeName: 'Medium', sizecode: 'md' }, { sizeName: 'Large', sizecode: 'lg' }, { sizeName: 'XL', sizecode: 'xl' }, { sizeName: '2XL', sizecode: '2xl' }, { sizeName: '3XL', sizecode: '3xl' }]

    const fontSizeChangerOnclick = (sizeCode) => {
        setfontSize(sizeCode)
    }


    const onClickHandler = (href, title) => {

        router.push({
            pathname: `/story/${title}`,
            query: { link: href }
        })
    }




    return (
        <div className="md:w-3/5 p-4 bg-orange-50  m-2 shadow rounded-lg "  >
            <Head>
                <meta name="referrer" content="no-referrer" />
                <title>{`${story_Category.replace('-', ' ')} - ${story_details.Title}`}</title>
                <meta name="description" content={story_details.description[0]} />

            </Head>
            <div className='flex items-center justify-between'>

                <h1 className='text-xl md:text-2xl font-semibold text-orange-800'>{story_details.Title}</h1>
                <Menu as="div" className={` relative  text-left  md:scale-125 `}>
                    <div className=' w-fit '>
                        <Menu.Button className="inline-flex justify-center cursor-pointer  w-full rounded-md  shadow-sm px-2 py-2 bg-slate-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Text Size
                            {/* <img className='ml-2' src='https://cdn-icons.flaticon.com/png/512/2043/premium/2043488.png?token=exp=1647712043~hmac=80017e50d71fb76634fd067d627f6063' alt='loading' height={14} width={14}></img> */}
                        </Menu.Button>

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
                    <p onClick={() => { router.push(`/author/${story_details.author.href.substring(story_details.author.href.indexOf('author/') + 7, story_details.author.href.length - 1)}`) }} className='cursor-pointer underline hover:text-red-500 font-semibold text-gray-600' >{story_details.author.name}</p>
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
                    <div key={p}>
                        <p className={`text-gray-800 font-kalam text-${fontSize}`} >
                            {p}
                            <br />
                        </p>
                        <br></br>
                    </div>
                )
            })}


            <div >
                <div className='flex'>
                    <FolderIcon className='icon text-orange-700' />
                    <p>{story_details.category.title}</p>
                </div>
                <div className='flex'>
                    <TagIcon className='icon text-orange-700' />
                    <div className='flex flex-wrap space-x-1'>

                        {story_details.tagsArray.map(tag => {
                            return (
                                <Link key={tag} href={`/tag/${tag.toLowerCase().replace(/ /g, "-")}`}>
                                    <a>
                                        <p className='hover:text-red-800 cursor-pointer font-semibold underline rounded text-xs m- border-gray-500  ' >{tag}</p>
                                    </a>
                                </Link>

                            )
                        })}
                    </div>
                </div>


                <div className='my-2'>
                    {story_details.storiesLink_insideParagrapgh.map(item => {

                        const rough = item.href.substring(item.href.indexOf('.com/') + 5, item.href.length - 1)
                        const category = rough.substring(0, rough.indexOf('/'))
                        const title = rough.substring(rough.indexOf('/') + 1, rough.length)


                        return (
                            <div key={item.name} className='flex'>
                                <ChevronRightIcon className='icon' />
                                <Link href={`/${category}/${title}`}>
                                    <a>
                                        <p className='underline hover:text-red-800 cursor-pointer '>{item.title}</p>
                                    </a>
                                </Link>
                            </div>
                        )
                    })}
                </div>




                <p className='my-2 text-lg text-red-800 font-semibold'>????????? ?????? ????????? ?????? ????????????????????????</p>


                <div className='my-2'>
                    {story_details.relatedStoriesLinks.map(item => {
                        const rough = item.href.substring(item.href.indexOf('.com/') + 5, item.href.length - 1)
                        const category = rough.substring(0, rough.indexOf('/'))
                        const title = rough.substring(rough.indexOf('/') + 1, rough.length)


                        return (
                            <div key={item.name} className='flex'>
                                <ChevronRightIcon className='icon' />
                                <Link href={`/${category}/${title}`}>
                                    <a>
                                        <p className='underline hover:text-red-800 cursor-pointer '>{item.title}</p>
                                    </a>
                                </Link>
                            </div>
                        )
                    })}
                </div>

            </div>




        </div>
    )
}

export default Story


export async function getStaticPaths() {


    return {
        paths: [{
            params: {
                story_Category: 'teenage-girl',
                story: 'sister-ass-fuck-story'
            }
        }],
        fallback: true // false or 'blocking'
    };
}



export async function getStaticProps(context) {


    const { story, story_Category } = context.params

    var story_details = {}
    const scrape = async (url) => {



        var Title = ''
        var author = {}
        var date = ''
        var views = ''
        var description = []
        var audiolink = ''
        var storiesLink_insideParagrapgh = []
        var relatedStoriesLinks = []
        var category = {}
        var tagsArray = []


        const response = await fetchdata(url)
        const body = await response.text();
        const $ = cheerio.load(body)

        // fs.writeFileSync(`Home.html`, body);




        $('.entry-title').each((i, el) => {

            const data = $(el).text()
            Title = data

        })
        //Author name and link

        $('.author-name').each((i, el) => {
            const authorName = $(el).text()

            $('.url.fn.n').each((i, el) => {
                const authorHref = $(el).attr('href')
                author = { name: authorName, href: authorHref }
            })

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

        $('.entry-content p a').each((i, el) => {
            const href = $(el).attr('href')
            const data = $(el).text()
            if (!data.includes('protected'))
                storiesLink_insideParagrapgh.push({
                    title: data,
                    href: href
                })
        })

        $('.prev a').each((i, el) => {
            const href = $(el).attr('href')
            const data = $(el).text()
            if (!data.includes('protected'))
                storiesLink_insideParagrapgh.push({
                    title: data,
                    href: href
                })
        })
        $('.next a').each((i, el) => {
            const href = $(el).attr('href')
            const data = $(el).text()
            if (!data.includes('protected'))
                storiesLink_insideParagrapgh.push({
                    title: data,
                    href: href
                })
        })
        $('.cat-links a').each((i, el) => {
            const href = $(el).attr('href')
            const data = $(el).text()
            if (!data.includes('protected'))
                category = {
                    title: data,
                    href: href
                }
        })
        $('ol li a').each((i, el) => {
            const href = $(el).attr('href')
            const data = $(el).text()
            relatedStoriesLinks.push({
                title: data,
                href: href
            })
        })

        $('.tags-links').each((i, el) => {

            const select = cheerio.load(el)
            select('a').each((i, el) => {
                const data = $(el).text()
                tagsArray.push(data)
            })

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
            audiolink: audiolink != null ? audiolink : '',
            storiesLink_insideParagrapgh: storiesLink_insideParagrapgh,
            category: category,
            tagsArray: tagsArray,
            relatedStoriesLinks: relatedStoriesLinks
        }

    }



    await scrape(`https://www.freesexkahani.com/${story_Category}/${story}/`)




    return {
        props: {
            story_details: story_details
        }
    }


}
