import { Outstream, Placeholder } from "exoclick-react";
import { useContext } from 'react';
import videosContext from '../../context/videos/videosContext';


function Outstreams() {


    const context = useContext(videosContext);
    const { disclaimerShow, setdisclaimerShow } = context;
    return (

        <div className="flex sticky bottom-0 right-0  justify-end w-full z-10 p-1">


            <div className="sm:hidden">

                <Placeholder width="250" height="150">
                    <Outstream zoneId="4586596" maxWidth={400} />
                </Placeholder>
            </div>

            <div className="hidden sm:flex">
                <Placeholder width="400" height="266">
                    <Outstream zoneId="4604096" maxWidth={400} />
                </Placeholder>
            </div>
        </div>
    )
}

export default Outstreams;
