import { useState, useRef } from "react";
import ReactPaginate from "react-paginate";
import { useContext, useEffect } from 'react'
import videosContext from '../context/videos/videosContext'

import BannerAds from './Ads/BannerAds'
import Outstream from './Ads/Outstream'
import RecommendedAds from './Ads/RecommendedAds'
import StoryThumbnail from "./StoryThumbnail";


function Stories({ stories }) {



    return (
        <div className="">
            <BannerAds />
            <div className='grid grid-cols-1 p-1 md:grid-cols-2'
            >
                {
                    stories.map(story => {
                        return (
                            <StoryThumbnail key={story.Title} story_details={story} />
                        )
                    })
                }

            </div>
            {/* <Outstream /> */}
        </div>


    )
}

export default Stories
