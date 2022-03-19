import {
    ChevronRightIcon
} from '@heroicons/react/solid';
import { useContext, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/router';


function StoryThumbnail({story_detail}) {

  

    return (
        <div className="">

  <p>{story_detail}</p>

        </div>
    )
}

export default StoryThumbnail

