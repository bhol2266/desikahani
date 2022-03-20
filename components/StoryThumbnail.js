import {
    PencilAltIcon, EyeIcon
} from '@heroicons/react/solid';
import { useContext, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { BeatLoader } from 'react-spinners';
import Link from 'next/link'
import { useRouter } from 'next/router'


function StoryThumbnail({ story_details }) {

    const router = useRouter()

    const onClickHandler = () => {
        router.push({
            pathname: `/story/${story_details.Title}`,
            query: { link: story_details.href }
        })
    }


    return (
        <div className=" p-4 bg-orange-100 border-2 border-gray-400 m-2 shadow rounded-lg "  >
            <p onClick={onClickHandler}  className='text-xl font-semibold text-orange-800 cursor-pointer hover:text-green-800  '>{story_details.Title}</p>
            <div className='flex items-center text-sm  my-2 space-x-2'>

                <div className='flex  items-center '>
                    <PencilAltIcon className='icon text-brown-400' />
                    <p className='font-semibold text-gray-600' >{story_details.author}</p>
                </div>
                <p className='font-semibold text-gray-600'>{story_details.date}</p>

                <div className='flex items-center'>
                    <EyeIcon className='icon text-blue-500' />
                    <p className='font-semibold text-gray-600'>{story_details.views}</p>
                </div>
            </div>


            <p className='text-gray-800 text-lg'>{story_details.description}</p>


            <p onClick={onClickHandler} className=' mb-1 font-semibold text-md text-right text-orange-800 hover:text-green-800 cursor-pointer'>पूरी कहानी पढ़ें</p>


            <div className='flex flex-wrap space-x-1'>

                {story_details.tags.map(tag => {
                    return (

                        <p onClick={onClickHandler} className='hover:text-red-800 cursor-pointer bg-yellow-100 border-2 rounded text-xs m-1 border-gray-500 hover:bg-yellow-200 ' key={tag}>{tag}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default StoryThumbnail

