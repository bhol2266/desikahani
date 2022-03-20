import Link from 'next/link';
import { useRouter } from 'next/router';

import { useContext, useEffect } from 'react';
import videosContext from '../context/videos/videosContext'


function Footer() {

    //Use Context
    const context = useContext(videosContext);
    const { spinnerLoading } = context;

    return (

        <div className={`font-footer mx-auto bg-orange-300  ${spinnerLoading ? "hidden" : ""}`}>
            < div className=" w-4/5 mx-auto p-1 mt-1 flex items-center justify-between ">
                <div className=" flex flex-wrap justify-between min-w-full">
                    <Link
                        passHref={true}
                        href={'/contact'}
                    >
                        <p className="font-semibold  cursor-pointer text-lg hover:text-white text-black  ">Contact / support</p>
                    </Link>


                    <Link
                        passHref={true}
                        href={'/faq'}
                    >
                        <p className="font-semibold  cursor-pointer text-lg hover:text-white text-black  ">FAQ</p>

                    </Link>
                    <Link
                        passHref={true}
                        href={'/parentalcontrol'}
                    >
                        <p className="font-semibold  cursor-pointer text-lg hover:text-white text-black  ">Parental control</p>

                    </Link>



                    <Link
                        passHref={true}
                        href={'/terms'}
                    >
                        <p className="font-semibold  cursor-pointer text-lg hover:text-white text-black  ">Terms of use</p>

                    </Link>
                    <Link
                        passHref={true}
                        href={'/privacy'}
                    >

                        <p className="font-semibold  cursor-pointer text-lg hover:text-white text-black  ">2257 Statement & Privacy Policy</p>
                    </Link>
                    <Link
                        passHref={true}
                        href={'/dmca'}
                    >
                        <p className="font-semibold  cursor-pointer text-lg hover:text-white text-black  ">DMCA / Copyright Claims</p>

                    </Link>
                </div>

            </div>

            <div className='flex p-2 items-center justify-between  w-4/5 mx-auto'>
                <p className='font-semibold'>© 2022 Chutlunds.live IS A FREE PORN VIDEOS</p>

                <div className='p-2  rounded'>

                    {/* <img
                        src='./rta.png'
                        height={80}
                        width={80}
                        layout='fixed'
                        alt='fdsg'
                    ></img> */}
                </div>
            </div>
        </div>

    )

}

export default Footer
