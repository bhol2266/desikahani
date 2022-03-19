import { useState, useRef, useEffect, } from 'react';
import { useContext } from 'react'
import videosContext from '../context/videos/videosContext'
import ReactCountryFlag from "react-country-flag"

import { Fragment } from 'react'

import {

} from '@heroicons/react/solid'
import {
    MoonIcon,
    MenuIcon,
    SearchIcon,
    SunIcon,
    LoginIcon,
    UserIcon

} from '@heroicons/react/outline'
import { useRouter } from 'next/router';

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import Link from 'next/link';

var navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Category', href: '/category', current: false },
    { name: 'Leaked Pictures', href: '/pics/1', current: false },
    { name: 'Community', href: '#', current: false },
    { name: 'Live Cams', href: "https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers", current: false },
    { name: 'Meet & Fuck', href: "https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers", current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Navbar() {

    const router = useRouter();
    const context = useContext(videosContext);
    const { currentLocation, getVideos, countryBlocked } = context;

    const [location, setlocation] = useState(currentLocation)


    useEffect(() => {
        if (localStorage.getItem("location") && !currentLocation) {
            setlocation(JSON.parse(localStorage.getItem("location")))
        }

    }, [])








    const enableLightMode = () => {
        setDarkThemeFunc('light')
    }

    const enableDarkMode = () => {
        setDarkThemeFunc('dark')
    }


    const [searchBarVisibility, setsearchBarVisibility] = useState('hidden');
    const searchInputref = useRef('')
    const handleSearchIconClick = () => {
        if (searchBarVisibility === 'hidden') {
            setsearchBarVisibility('flex')
        } else {
            setsearchBarVisibility('hidden')

        }
    }
    const goSearch = (e) => {
        e.preventDefault();

        if (e.target[0].value) {
            router.push(`/search/${e.target[0].value.trim()}**1`)

        }

    }

    const chutlundClick = () => {
        setsearchBarVisibility('hidden')
        searchInputref.current.value = ''
    }

    const handleClickFlag = () => {
        router.push({
            pathname: '/VideosList',
            query: {
                key: location.country_name,
                name: `Trending Porn videos in ${location.country_name}`
            }
        })
    }


    return (

        <div>

            <div className="bg-blue-300 p-2  shadow-md lg:hidden">

                <Disclosure as="nav" >
                    {({ open }) => (
                        <>
                            <div className='flex  items-center justify-between'>

                                <div className='flex items-center space-x-1' >

                                    <Link href='/'>
                                        <p className=' align-center text-center font-body text-3xl pl-1 pr-1 cursor-pointer lg:text-left lg:ml-6'>Desi Kahaniya</p>
                                    </Link>
                                    {location &&
                                        <div className='cursor-pointer' onClick={handleClickFlag}>
                                            <ReactCountryFlag
                                                svg
                                                countryCode={location.country_code}
                                                style={{
                                                    fontSize: '25px',
                                                    lineHeight: '25px',
                                                }}
                                                aria-label="United States"
                                            />
                                        </div>
                                    }

                                </div>






                                <div className='flex items-center'>

                                    <div onClick={handleSearchIconClick} className=' lg:hidden mr-2 cursor-pointer p-2  hover:bg-gray-700 hover:text-white rounded-md '>
                                        <SearchIcon className='h-6 w-6' />
                                    </div>


                                    <Disclosure.Button className="lg:hidden items-center justify-center   rounded-md text-black hover:text-white hover:bg-gray-700 p-2">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>



                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Disclosure.Panel className="sm:flex">
                                    <div className="px-2 pt-2 pb-3 space-y-1">
                                        {navigation.map((item) => (


                                            <a href={item.href} key={item.name} >
                                                <Disclosure.Button
                                                    as="a"
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'block px-3 py-2 rounded-md text-base font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Disclosure.Button>
                                            </a>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </Transition>
                        </>
                    )}
                </Disclosure>

                <div className={`p-1 ${searchBarVisibility}  transition ease-in-out delay-150 mt-2 `}>

                    <form className=' w-full flex ' onSubmit={goSearch}>

                        <input ref={searchInputref} className='flex-grow border-2 border-gray-300 rounded pl-2  ' type="text" placeholder='Search your favourite porn video...' />

                        <button type="submit" className='bg-red-800  hover:bg-red-900 text-white text-sm p-2 pl-4 pr-4 m-1 rounded '>Search</button>

                    </form>
                </div>



            </div>
            <div className='flex justify-evenly items-center mb-1 bg-red-100 shadow-lg lg:hidden '>

                <Link href='/'>
                    <a >
                        <p className='font-bold sm:text-xl text-green-900  text-center p-1 pr-6 hover:text-red-600  '>Home</p>
                    </a>
                </Link>

                <Link href='/category'>
                    <a >
                        <p className='font-bold sm:text-xl text-green-900  text-center p-1 pr-6 hover:text-red-600  '>Catergories</p>
                    </a>
                </Link>
                
                <Link href='/pics/1'>
                    <a >
                        <p className='font-bold sm:text-xl text-green-900  text-center p-1 pr-6 hover:text-red-600 '>Leaked Pictures</p>
                    </a>
                </Link>




            </div>

            {/* Large Sreeen NavBar  */}

            <div className='flex-col hidden lg:flex' >


                {/* Navbar */}
                <div className='flex items-center justify-between bg-blue-300 pt-2 pb-2 '>

                    <div className='flex items-center space-x-1 md:space-x-3 ' >
                        <Link href='/'>

                            <p className=' align-center text-center font-body text-4xl cursor-pointer lg:text-left lg:ml-6'>Desi Kahaniya</p>

                        </Link>
                        {location &&

                            <div className='cursor-pointer' onClick={handleClickFlag}>
                                <ReactCountryFlag
                                    svg
                                    countryCode={location.country_code}
                                    style={{
                                        fontSize: '25px',
                                        lineHeight: '25px',
                                    }}
                                    aria-label="United States"
                                />
                            </div>
                        }

                        <a target="_blank" href={countryBlocked ? "https://go.xxxiijmp.com/?userId=9ea31ff27db3b7242eabcc2d26ac0eaf38f093c68528e70c2e7f5a72df55c42e" : "https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers"} rel="noopener noreferrer">
                            <div className='  flex  items-center 
                             cursor-pointer hover:scale-105   '>
                                <img
                                    src='/livesex.png'
                                    height={40}
                                    width={40}
                                    layout='fixed'
                                    alt='loading'
                                ></img>
                                <p className='font-bold '>Live Sex</p>
                            </div>
                        </a>
                    </div>


                    <div className='flex space-x-4 items-center  '>
                        <form className=' flex items-center ' onSubmit={goSearch}>

                            <input ref={searchInputref} className='flex-grow border-2 border-gray-300 rounded pl-2 h-10  ' type="text" placeholder='Search your favourite porn video...' />

                            <button type="submit" className='bg-red-800  hover:bg-red-900 text-white text-sm h-10  pl-4 pr-4 m-1 rounded '>Search</button>

                        </form>
                        <button className='bg-black rounded text-yellow-500 h-10 pl-3 pr-3 text-xl hover:text-white'>
                            Upload
                        </button>

                        <div >
                            <button className='p-1 pl-2 pr-2 border-2 border-black  rounded-l'>
                                <SunIcon onClick={enableLightMode} className='h-8 w-8 text-white' />
                            </button>
                            <button className='p-1 pl-2 pr-2 border-2 border-black  rounded-r'>                                            <MoonIcon onClick={enableDarkMode} className='h-8 w-8' />
                            </button>
                        </div>

                        <div className='flex items-center '>
                            <UserIcon className='h-8 w-8' />
                            <p className=' m-2 border-2 rounded border-black  pl-2 pr-2 font-bold cursor-pointer hover:bg-red-800'>Login</p>
                            <p className='m-1 border-2 rounded border-black  pl-2 pr-2 font-bold cursor-pointer hover:bg-red-800'>Register</p>
                        </div>
                    </div>

                </div>






                <div className='w-full bg-gray-800  items-center justify-around   flex mb-2 shadow-lg'>
                    {navigation.map(item => {

                        return (
                            <Link href={item.href} key={item.name}>

                                <a>
                                    <p key={item.name} className='text-xl font-semibold cursor-pointer p-1 text-white hover:text-yellow-400'>{item.name}</p>
                                </a>
                            </Link>
                        )
                    })}


                    <a target="_blank" href="https://chaturbate.com/in/?tour=LQps&campaign=3v7pk&track=default&room=ukdevelopers" rel="noopener noreferrer">
                        <p className='text-xl font-semibold cursor-pointer p-1 text-black hover:text-red-700'>Live Sex</p>
                    </a>


                </div>

            </div>


        </div>
    )
}

export default Navbar
