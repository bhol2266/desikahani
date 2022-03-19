import React from 'react'
import { useRouter } from "next/router";
import { Banner, Outstream } from "exoclick-react";


function PicsThumbnail({ data }) {

    const router = useRouter();

    const nextlink = data.nextLink.substring(data.nextLink.indexOf(".co/") + 4, data.nextLink.length)
    const openNextlink = () => {
        console.log(f);

        router.push(`/pics/${f}`)
    }

    return (
        <div>

            <div className={` mb-2 animate-fade flex   flex-col justify-center  cursor-pointer  shadow-md  border-2 rounded-lg overflow-hidden	 md:hover:scale-105 transform transition duration-150 bg-white`}>
                <a href={`/pics/album/${nextlink}`}>

                    <img
                        loading="lazy"
                        alt={"loading"}
                        src={data.thumbnailUrl}
                        layout='fixed'
                        height={1080}
                        width={1920}
                    ></img>


                    <p className='text-sm p-1 font-bold'>{data.title}</p>
                    <p className='text-sm p-1 '>{data.dataAdded}</p>

                </a>

            </div>

        </div>
    )
}

export default PicsThumbnail