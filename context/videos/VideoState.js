import videosContext from "./videosContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";






const VideoState = (props) => {

    const router = useRouter();
    const [spinnerLoading, setspinnerLoading] = useState(false)
    const [DarkTheme, setDarkTheme] = useState('')
    const [currentLocation, setcurrentLocation] = useState(null)




    function setSpinner(boolean) {

        setspinnerLoading(boolean)
        setTimeout(() => {
            setspinnerLoading(false)

        }, 2000);

    }
    function setDarkThemeFunc(theme) {
        setDarkTheme(theme)

    }





    return (
        <videosContext.Provider value={{ spinnerLoading, setSpinner, setDarkThemeFunc, DarkTheme, currentLocation, setcurrentLocation, }}>
            {props.children}
        </videosContext.Provider>
    )
}




export default VideoState;