import {
    PencilAltIcon, EyeIcon
} from '@heroicons/react/solid';
import { useContext, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/router';


function StoryThumbnail({ story_details }) {

    // style={{backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/3946/3946329.png')"}}
    return (
        <div className=" p-4 bg-orange-100 border-2 border-gray-400 m-2 shadow rounded-lg "  >
            <p className='text-2xl font-semibold text-red-700 cursor-pointer hover:text-green-700  '>{story_details.Title}</p>
            <div className='flex items-center text-xl  my-2 space-x-2'>

                <div className='flex '>
                    <PencilAltIcon className='icon text-red-500' />
                    <p className='font-semibold text-gray-600' >{story_details.author}</p>
                </div>
                <p className='font-semibold text-gray-600'>{story_details.date}</p>

                <div className='flex'>
                    <EyeIcon className='icon text-blue-500' />
                    <p className='font-semibold text-gray-600'>{story_details.views}</p>
                </div>
            </div>


            <p className='font-semibold text-gray-800 text-lg'>{story_details.description}</p>


            <div className='flex flex-wrap space-x-1'>

                {story_details.tags.map(tag => {
                    return (
                        <a className='hover:text-red-800 cursor-pointer bg-yellow-100 border-2 rounded text-sm m-1 border-gray-500 hover:bg-yellow-200 ' href={''} key={tag}>{tag}</a>
                    )
                })}
            </div>
        </div>
    )
}

export default StoryThumbnail

