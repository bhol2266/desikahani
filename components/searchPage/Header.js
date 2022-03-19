/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { SearchIcon, ArrowRightIcon, CogIcon, ClockIcon, XCircleIcon, CalendarIcon } from '@heroicons/react/solid'
import { FilterIcon } from '@heroicons/react/outline'
import Link from 'next/link'

import { useContext } from 'react'
import videosContext from '../../context/videos/videosContext'
import Router from 'next/router'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header({ keyword, pageNumber, filteredObjsArrayProps }) {

    const context = useContext(videosContext);
    const { setSpinner, } = context;

    const [currentPage, setcurrentPage] = useState('')

    useEffect(() => {
        setcurrentPage(window.location.href.includes('/search/') ? "searchPage" : "categoryPage")
    }, [])
    


    // This object is to display whats stuffs are filtered 
    const Final_filteredArray = []


    var filter_isPresent = ''
    var quality_isPresent = 'All'
    var duration_isPresent = 'All'
    var date_isPresent = 'All'
    if (filteredObjsArrayProps) {
        for (let index = 0; index < filteredObjsArrayProps.length; index++) {
            if (filteredObjsArrayProps[index].includes("o=")) {

                if (filteredObjsArrayProps[index].includes('new')) {
                    filter_isPresent = 'New'
                }
                if (filteredObjsArrayProps[index].includes('hot')) {
                    filter_isPresent = 'Trending'

                }
                if (filteredObjsArrayProps[index].includes('top')) {

                    filter_isPresent = 'Popular'
                }
                Final_filteredArray.push(filter_isPresent)
            }
            if (filteredObjsArrayProps[index].includes("q=")) {
                if (filteredObjsArrayProps[index].includes('hd')) {
                    quality_isPresent = '720p'
                }
                if (filteredObjsArrayProps[index].includes('fhd')) {
                    quality_isPresent = '1080p'
                }
                if (filteredObjsArrayProps[index].includes('uhd')) {
                    quality_isPresent = '4K'
                }
                Final_filteredArray.push(quality_isPresent)

            }
            if (filteredObjsArrayProps[index].includes("d=")) {
                if (filteredObjsArrayProps[index].includes('10')) {
                    duration_isPresent = '10+min'
                }
                if (filteredObjsArrayProps[index].includes('20')) {
                    duration_isPresent = '20+min'
                }
                if (filteredObjsArrayProps[index].includes('40')) {
                    duration_isPresent = '40+min'
                }
                Final_filteredArray.push(duration_isPresent)

            }
            if (filteredObjsArrayProps[index].includes("p=")) {
                if (filteredObjsArrayProps[index].includes('d')) {
                    date_isPresent = 'Today'
                }
                if (filteredObjsArrayProps[index].includes('w')) {
                    date_isPresent = 'This Week'
                }
                if (filteredObjsArrayProps[index].includes('m')) {
                    date_isPresent = 'This Month'
                }
                if (filteredObjsArrayProps[index].includes('y')) {
                    date_isPresent = 'This Year'
                }
                Final_filteredArray.push(date_isPresent)

            }


        }
    }

    const filter = [
        { name: 'Relevant', query: 'o=' },
        { name: 'Trending', query: 'o=hot' },
        { name: 'New', query: 'o=new' },
        { name: 'Popular', query: 'o=top' },
    ]
    const qualtiy = [
        { name: '720p', query: 'q=hd' },
        { name: '1080p', query: 'q=fhd' },
        { name: '4K', query: 'q=uhd' },
        { name: 'All', query: 'q=' },
    ]
    const duration = [
        { name: '10+min', query: 'd=10' },
        { name: '20+min', query: 'd=20' },
        { name: '40+min', query: 'd=40' },
        { name: 'All', query: 'd=' },
    ]
    const date = [
        { name: 'Today', query: 'p=d' },
        { name: 'This Week', query: 'p=w' },
        { name: 'This Month', query: 'p=m' },
        { name: 'This Year', query: 'p=y' },
        { name: 'All', query: 'p=' },
    ]

    const clickHandler = (query) => {
        setSpinner(true)
        var queryObj = {}
        //if this headed component is of search page or category page
        if (currentPage === 'searchPage') {
            var queryObj = {
                searchkey: keyword,
                page: 1
            }
        } else {
            var queryObj = {
                category: keyword,
                page: 1
            }
        }
        if (filteredObjsArrayProps) {
            for (let index = 0; index < filteredObjsArrayProps.length; index++) {

                queryObj[filteredObjsArrayProps[index].substring(0, filteredObjsArrayProps[index].indexOf('='))] = filteredObjsArrayProps[index].substring(filteredObjsArrayProps[index].indexOf('=') + 1, filteredObjsArrayProps[index].length)
            }
        }

        if (query) {
            queryObj[query.substring(0, query.indexOf('='))] = query.substring(query.indexOf('=') + 1, query.length)
        }


        if (currentPage === 'searchPage') {
            Router.push({
                pathname: `/search/query/`,
                query: queryObj
            })
        } else {
            Router.push({
                pathname: `/category/query/`,
                query: queryObj
            })
        }


    }

    const removefilter = (item) => {

        if (item === 'Relevant' || item === 'Trending' || item === 'New' || item === 'Popular') {
            for (let index = 0; index < filteredObjsArrayProps.length; index++) {
                if (filteredObjsArrayProps[index].includes("o=")) {
                    filteredObjsArrayProps.splice(index, 1);
                    clickHandler()
                }

            }
        }
        if (item === 'Today' || item === 'This Week' || item === 'This Month' || item === 'This Year') {
            for (let index = 0; index < filteredObjsArrayProps.length; index++) {
                if (filteredObjsArrayProps[index].includes("p=")) {
                    filteredObjsArrayProps.splice(index, 1);
                    clickHandler()

                }

            }
        }
        if (item === '10+min' || item === '20+min' || item === '40+min') {
            for (let index = 0; index < filteredObjsArrayProps.length; index++) {
                if (filteredObjsArrayProps[index].includes("d=")) {
                    filteredObjsArrayProps.splice(index, 1);
                    clickHandler()

                }

            }
        }
        if (item === '720p' || item === '1080p' || item === '4K') {
            for (let index = 0; index < filteredObjsArrayProps.length; index++) {
                if (filteredObjsArrayProps[index].includes("q=")) {
                    filteredObjsArrayProps.splice(index, 1);
                    clickHandler()

                }

            }
        }


    }




    return (

        <div>
            <div className='flex items-start md:pr-10 pt-2  sm:p-1 px-2 md:px-3'>
                <SearchIcon className='icon text-red-500' />
                <div className='flex  '>
                    <p className='text-xl md:2xl pl-1 pr-1 flex-grow'>{currentPage === 'searchPage' ? "Search:" : "Category:"}</p>
                    <p className='text-xl md:2xl pl-1 pr-1 font-semibold text-green-900  '>{keyword.toUpperCase()}</p>

                </div>
                <p className='text-xl  pl-1 pr-1 font-bold flex-grow  text-right text-green-900 '>{`PAGE-${pageNumber}`}</p>
            </div>


            <div className='w-fit   md:flex sm:p-1 px-2   '>

                {/* This filtered applied bar */}
                <div className='flex items-center flex-wrap justify-start  space-y-1  space-x-2 pr-2 mb-2 md:mb-0   '>
                    {Final_filteredArray.map(item => {
                        return (
                            <div key={item} onClick={() => { removefilter(item) }} className='border-2 pl-1  text-sm font-semibold hover:bg-red-200 cursor-pointer border-red-500 px-0.5 rounded flex items-center'>
                                <p >{item}</p>
                                <XCircleIcon className='icon text-red-500' />
                            </div>
                        )
                    })}
                </div>
                <div className='flex items-center justify-center flex-wrap mb-1    space-x-1 space-y-1 sm:space-x-2'>

                    <Menu as="div" className={` relative  text-left`}>
                        <div className=' w-fit'>
                            <Menu.Button className="inline-flex justify-center cursor-pointer  w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
                                Filter
                                <FilterIcon className="-mr-1 ml-2 h-5 w-5 " aria-hidden="true" />
                            </Menu.Button>
                            <p className='text-gray-700 block px-4 text-sm font-semibold hover:bg-green-200 hover:text-red-500'
                            >
                            </p>
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
                            <Menu.Items className=" z-50 origin-top-right absolute left-0 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                                {filter.map(item => {
                                    return (
                                        <Menu.Item key={item.name}  >
                                            {({ active }) => (
                                                <p onClick={() => { clickHandler(item.query) }} className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm font-semibold hover:bg-green-200 hover:text-red-500 cursor-pointer'
                                                )}
                                                >
                                                    {item.name}
                                                </p>
                                            )}
                                        </Menu.Item>



                                    )
                                })}



                            </Menu.Items>
                        </Transition>
                    </Menu>


                    <Menu as="div" className="relative  text-left">
                        <div className=' w-fit'>
                            <Menu.Button className="inline-flex justify-center cursor-pointer  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
                                Quality
                                <CogIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
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
                            <Menu.Items className=" z-50 origin-top-right absolute right-0 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">

                                    {qualtiy.map(item => {
                                        return (
                                            <Menu.Item key={item.name} >
                                                {({ active }) => (
                                                    <p onClick={() => { clickHandler(item.query) }} className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm font-semibold hover:bg-green-200 hover:text-red-500 cursor-pointer'
                                                    )}
                                                    >
                                                        {item.name}
                                                    </p>
                                                )}
                                            </Menu.Item>
                                        )
                                    })}



                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>


                    <Menu as="div" className="relative  text-left">
                        <div className=' w-fit'>
                            <Menu.Button className="inline-flex justify-center cursor-pointer  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
                                Duration
                                <ClockIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
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
                            <Menu.Items className=" z-50 origin-top-right absolute right-0 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">

                                    {duration.map(item => {
                                        return (
                                            <Menu.Item key={item.name} >
                                                {({ active }) => (
                                                    <p onClick={() => { clickHandler(item.query) }} className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm font-semibold hover:bg-green-200 hover:text-red-500 cursor-pointer'
                                                    )}
                                                    >
                                                        {item.name}
                                                    </p>
                                                )}
                                            </Menu.Item>
                                        )
                                    })}



                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>


                    <Menu as="div" className="relative  text-left">
                        <div className=' w-fit'>
                            <Menu.Button className="inline-flex justify-center cursor-pointer  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
                                Date
                                <CalendarIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
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
                            <Menu.Items className=" z-50 origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">

                                    {date.map(item => {
                                        return (
                                            <Menu.Item key={item.name} >
                                                {({ active }) => (
                                                    <p onClick={() => { clickHandler(item.query) }} className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm font-semibold hover:bg-green-200 hover:text-red-500 cursor-pointer'
                                                    )}
                                                    >
                                                        {item.name}
                                                    </p>
                                                )}
                                            </Menu.Item>
                                        )
                                    })}



                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>

            </div>
        </div>


    )
}

