import { Banner } from "exoclick-react";
import { useContext } from 'react';
import videosContext from '../../context/videos/videosContext';


function BannerAds() {


    const context = useContext(videosContext);
    const { disclaimerShow, setdisclaimerShow } = context;
    return (

        <div className={`max-w-full flex items-center justify-center`}>

            {/* Mobile  */}

            <div className='lg:hidden'>
                <Banner zoneId={4580186} />
            </div>


            {/* Web  */}

            <div className='hidden lg:flex'>
                <Banner zoneId={4580008} />
            </div>


        </div>
    )
}

export default BannerAds;
