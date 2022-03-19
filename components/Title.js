import {
    ChevronRightIcon
} from '@heroicons/react/solid';
import { useContext, useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { BeatLoader } from 'react-spinners';
import HomePageVideos from './HomePageVideos';
import videosContext from '../context/videos/videosContext'
import { useRouter } from 'next/router';


function TItle() {

    const router = useRouter()
    const [currentLocation, setlocation] = useState({});
    const [Spinner, setSpinner] = useState(true);
    const [loadedVideos, setloadedVideos] = useState([])
    const { setcurrentLocation, setcountryBlocked } = useContext(videosContext);

    var location = {};
    var PornBanned = false;
    useEffect(() => {

        async function fetchdata() {
            setSpinner(true)

            try {
                const response = await fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0')
                location = await response.json()

                const response2 = await fetch(`https://www.eporner.com/api/v2/video/search/?query=${location.country_name}&per_page=10&thumbsize=big&order=popular&lq=1&format=json`).catch(error => {
                });
                const json = await response2.json();

                setloadedVideos(json)
                PornBanned = false

            } catch (error) {

                try {

                    const response = await fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0')
                    location = await response.json()



                    const response2 = await fetch(`https://www.eporner.com/api/v2/video/search/?query=${location.country_name}&per_page=10&thumbsize=big&order=popular&lq=1&format=json`).catch(error => {
                    });
                    const json = await response2.json();

                    setloadedVideos(json)
                    PornBanned = false

                } catch (error) {
                    PornBanned = true
                }
            }


            setlocation(location)
            setSpinner(false)
            setcurrentLocation(location)
            setcountryBlocked(false)

            if (PornBanned) {
                localStorage.setItem("coutryBlockedorNot", "blocked")
                router.push('/josporn/page/1')
            } else {
                localStorage.setItem("coutryBlockedorNot", "not")
            }

            localStorage.setItem("location", JSON.stringify(location))

            if(PornBanned){
                router.push('/josporn/page/1')
            }

        }
        fetchdata()

    }, [])


    const handleClick = () => {
        router.push(`/VideosList/${currentLocation.country_name}`)
    }




    return (
        <div className="">

            {PornBanned &&

                <div className="flex items-center justify-center p-2 ">
                    <img
                        src='/vpnIcon.png'
                        height={60}
                        width={60}
                        layout="fixed"
                        priority={true}
                    ></img>
                    <ReactCountryFlag
                        svg
                        countryCode={currentLocation.country_code}
                        style={{
                            fontSize: '2em',
                            lineHeight: '2em',
                        }}
                        aria-label="United States"
                    />
                    <p className="ml-4 md:text-2xl  font-bold">
                        {`Your country ${currentLocation.country_name} has blocked porn. Use VPN inorder to enjoy our Videos!!!`}
                    </p>


                </div>

            }
          

          

            <div className="mt-4">

                {Spinner &&
                    <div className="w-fit mx-auto mt-2">
                        <BeatLoader loading size={25} color={'red'} />
                    </div>
                }
                {loadedVideos.videos && <div>

                    <div onClick={handleClick} className='flex items-center p-2 m-1 justify-between bg-gray-200 rounded-lg border-2 border-gray-300 shadow-md cursor-pointer hover:bg-gray-300 hover:text-red-500'>

                        <div className="flex items-center space-x-2">
                            <p className='flex-grow text-xl sm:text-3xl ml-4'>
                                {`Trending Porn videos in ${currentLocation.country_name}`}
                            </p>
                            <ReactCountryFlag
                                svg
                                className="emojiFlag"
                                countryCode={currentLocation.country_code}
                                style={{
                                    fontSize: '2em',
                                    lineHeight: '2em',
                                }}
                                aria-label="United States"
                            />
                        </div>

                        <ChevronRightIcon className="icon" />


                    </div>
                    <HomePageVideos data={loadedVideos.videos} />


                </div>
                }




            </div>


        </div>
    )
}

export default TItle
