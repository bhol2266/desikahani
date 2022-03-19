import Link from 'next/link'
import React from 'react'

function Sidebar() {

    const categories = [
        'Aunty Sex Story',
        'Bhabhi Sex',
        'Desi Kahani',
        'Family Sex Stories',
        'First Time Sex',
        'Gay Sex Stories In Hindi',
        'Group Sex Stories',
        'Indian Sex Stories',
        'Sali Sex',
        'Teacher Sex',
        'Teenage Girl',
        'XXX Kahani',
        'अन्तर्वासना',
        'हिंदी सेक्स स्टोरीज'
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

    return (
        <div className='pt-1 hidden md:flex md:flex-col' >
            {categories.map(category => {
                return (
                    <Link key={category.Title} href={`/category/${category.Title}**1`}>
                        <a >
                            <p className="w-44 text-md border-2 border-white hover:bg-red-600 rounded-md text-white  p-1 pl-4 pr-2 cursor-pointer bg-black opacity-75">{category.Title}</p>
                        </a>
                    </Link>
                )
            })}

        </div>
    )
}

export default Sidebar