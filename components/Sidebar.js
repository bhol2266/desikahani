import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'


function Sidebar() {

  const router = useRouter()


  const categories = [

    {
      category_title: 'Aunty Sex Story',
      href: 'aunty-sex'
    },

    {
      category_title: 'Bhabhi Sex',
      href: 'bhabhi-sex'
    },
    {
      category_title: 'Desi Kahani',
      href: 'desi-kahani'
    },

    {
      category_title: 'Family Sex Stories',
      href: 'family-sex-stories'
    },
    {
      category_title: 'First Time Sex',
      href: 'first-time-sex'
    },
    {
      category_title: 'Gay Sex Stories In Hindi',
      href: 'gay-sex-story-hindi'
    },
    {
      category_title: 'Group Sex Stories',
      href: 'group-sex-stories'
    },
    {
      category_title: 'Indian Sex Stories',
      href: 'indian-sex-stories'
    },
    {
      category_title: 'Sali Sex',
      href: 'sali-sex'
    },
    {
      category_title: 'Teacher Sex',
      href: 'teacher-sex'
    },
    {
      category_title: 'Teenage Girl',
      href: 'teenage-girl'
    },
    {
      category_title: 'XXX Kahani',
      href: 'xxx-kahani'
    },
    {
      category_title: 'अन्तर्वासना',
      href: 'antarvasna'
    },
    {
      category_title: 'हिंदी सेक्स स्टोरीज',
      href: 'hindi-sex-stories'
    },










  ]

  const storiesBydate = [
    {
      name: 'मार्च 2022',
      href: 'https://www.freesexkahani.com/2022/03/'
    },
    {
      name: 'फ़रवरी 2022',
      href: 'https://www.freesexkahani.com/2022/02/'
    },
    {
      name: 'जनवरी 2022',
      href: 'https://www.freesexkahani.com/2022/01/'
    },
    {
      name: 'दिसम्बर 2021',
      href: 'https://www.freesexkahani.com/2021/12/'
    },
    {
      name: 'नवम्बर 2021',
      href: 'https://www.freesexkahani.com/2021/11/'
    },
    {
      name: 'अक्टूबर 2021',
      href: 'https://www.freesexkahani.com/2021/10/'
    },
    {
      name: 'सितम्बर 2021',
      href: 'https://www.freesexkahani.com/2021/09/'
    },
    {
      name: 'अगस्त 2021',
      href: 'https://www.freesexkahani.com/2021/08/'
    },
    {
      name: 'जुलाई 2021',
      href: 'https://www.freesexkahani.com/2021/07/'
    },
    { name: 'जून 2021', href: 'https://www.freesexkahani.com/2021/06/' },
    { name: 'मई 2021', href: 'https://www.freesexkahani.com/2021/05/' },
    {
      name: 'अप्रैल 2021',
      href: 'https://www.freesexkahani.com/2021/04/'
    },
    {
      name: 'मार्च 2021',
      href: 'https://www.freesexkahani.com/2021/03/'
    },
    {
      name: 'फ़रवरी 2021',
      href: 'https://www.freesexkahani.com/2021/02/'
    },
    {
      name: 'जनवरी 2021',
      href: 'https://www.freesexkahani.com/2021/01/'
    },
    {
      name: 'दिसम्बर 2020',
      href: 'https://www.freesexkahani.com/2020/12/'
    },
    {
      name: 'नवम्बर 2020',
      href: 'https://www.freesexkahani.com/2020/11/'
    },
    {
      name: 'अक्टूबर 2020',
      href: 'https://www.freesexkahani.com/2020/10/'
    },
    {
      name: 'सितम्बर 2020',
      href: 'https://www.freesexkahani.com/2020/09/'
    },
    {
      name: 'अगस्त 2020',
      href: 'https://www.freesexkahani.com/2020/08/'
    },
    {
      name: 'जुलाई 2020',
      href: 'https://www.freesexkahani.com/2020/07/'
    },
    { name: 'जून 2020', href: 'https://www.freesexkahani.com/2020/06/' },
    { name: 'मई 2020', href: 'https://www.freesexkahani.com/2020/05/' },
    {
      name: 'अप्रैल 2020',
      href: 'https://www.freesexkahani.com/2020/04/'
    },
    {
      name: 'मार्च 2020',
      href: 'https://www.freesexkahani.com/2020/03/'
    },
    {
      name: 'फ़रवरी 2020',
      href: 'https://www.freesexkahani.com/2020/02/'
    },
    {
      name: 'जनवरी 2020',
      href: 'https://www.freesexkahani.com/2020/01/'
    },
    {
      name: 'दिसम्बर 2019',
      href: 'https://www.freesexkahani.com/2019/12/'
    },
    {
      name: 'नवम्बर 2019',
      href: 'https://www.freesexkahani.com/2019/11/'
    },
    {
      name: 'अक्टूबर 2019',
      href: 'https://www.freesexkahani.com/2019/10/'
    },
    {
      name: 'सितम्बर 2019',
      href: 'https://www.freesexkahani.com/2019/09/'
    },
    {
      name: 'अगस्त 2019',
      href: 'https://www.freesexkahani.com/2019/08/'
    },
    {
      name: 'जुलाई 2019',
      href: 'https://www.freesexkahani.com/2019/07/'
    }
  ]

  const recentStories = [
    {
      name: 'चुदाई की लत ने रंडी बना दिया- 6',
      href: 'https://www.freesexkahani.com/group-sex-stories/hardcore-gangbang-sex-kahani/'
    },
    {
      name: 'कुंवारी भाभी को चोदकर मां बनाया- 3',
      href: 'https://www.freesexkahani.com/antarvasna/free-bhabhi-porn-story/'
    },
    {
      name: 'चुदाई की लत ने रंडी बना दिया- 5',
      href: 'https://www.freesexkahani.com/antarvasna/gang-bang-porn-story/'
    },
    {
      name: 'कुंवारी भाभी को चोदकर मां बनाया- 2',
      href: 'https://www.freesexkahani.com/antarvasna/a-sex-story-of-lust/'
    },
    {
      name: 'चुदाई की लत ने रंडी बना दिया- 4',
      href: 'https://www.freesexkahani.com/group-sex-stories/indian-randi-hot-kahani/'
    }
  ]

  const onClickHandler = (href, title) => {

    router.push({
      pathname: `/story/${title}`,
      query: { link: href }
    })
  }


  return (

    <div className='mx-6 pt-1 hidden md:flex md:flex-col'>

      <div   >
        <p className="w-56  text-lg  border-gray-400  rounded-md text-black font-bold  p-1 pl-4 pr-2 cursor-pointer bg-white opacity-75">श्रेणियां
        </p>

        {categories.map(category => {
          return (
            <Link key={category.category_title} href={`/category/${category.href}`}>
              <a >
                <p className="w-56 border-2   font-semibold text-md  border-gray-400 hover:bg-orange-200 rounded-md text-orange-900  p-1 pl-4 pr-2 cursor-pointer bg-white ">{category.category_title}</p>
              </a>
            </Link>
          )
        })}

      </div>

      <div className=' pt-1 hidden md:flex md:flex-col my-5' >
        <p className="w-56 text-lg   text-md  border-gray-400  rounded-md text-black font-bold  p-1 pl-4 pr-2 cursor-pointer bg-white opacity-75">हाल के पोस्ट
        </p>

        {recentStories.map(story => {

          const rough = story.href.substring(story.href.indexOf('.com/') + 5, story.href.length - 1)
          const category = rough.substring(0, rough.indexOf('/'))
          const title = rough.substring(rough.indexOf('/') + 1, rough.length)



          return (
            <Link key={story.name} href={`/${category}/${title}`}>
              <a >
                <p className="w-56 border-2   font-semibold text-md  border-gray-400 hover:bg-orange-200 rounded-md text-orange-900  p-1 pl-4 pr-2 cursor-pointer bg-white ">{story.name}</p>
              </a>
            </Link>


          )
        })}

      </div>

      <div   >
        <p className="w-56  text-lg  border-gray-400  rounded-md text-black font-bold  p-1 pl-4 pr-2 cursor-pointer bg-white opacity-75">पुरालेख
        </p>

        {storiesBydate.map(story => {
          return (

            <p key={story.name} onClick={() => { onClickHandler(story.href, story.name) }} className="w-56 font-semibold text-md border-2  border-gray-400 hover:bg-orange-200 rounded-md text-orange-900  p-1 pl-4 pr-2 cursor-pointer bg-white opacity-75">{story.name}</p>

          )
        })}

      </div>
    </div>
  )
}

export default Sidebar