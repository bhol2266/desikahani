import VideoThumbnail from "./VideoThumbnail"
import { useState, useRef } from "react";
import ReactPaginate from "react-paginate";
import { useContext, useEffect } from 'react'
import videosContext from '../context/videos/videosContext'

import BannerAds from './Ads/BannerAds'
import Outstream from './Ads/Outstream'
import RecommendedAds from './Ads/RecommendedAds'


function Videos({ data }) {



    return (
        <div className="">
            <BannerAds />
            <div className='grid grid-cols-2 p-1  gap-x-1  sm:pl-4 sm:pr-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            >
                {
                    data.map(video => {
                        return (
                            <VideoThumbnail key={video.thumbnailArray} details={video} />
                        )
                    })
                }

            </div>
            {/* <Outstream /> */}
        </div>


    )
}

export default Videos
