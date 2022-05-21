import fetchdata from 'node-fetch';
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import fs from 'fs';

var finalDataArray = []

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
        category_title: 'Family Sex Stories',
        href: 'family-sex-stories'
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
const scrape = async (url) => {
    console.log(url);
    var hrefArray = []

    const response = await fetchdata(url)
    const body = await response.text();
    const $ = cheerio.load(body)


    $('div div div div  div div a').each((i, el) => {
        const href = $(el).attr("href")
        hrefArray.push(`https://www.desikahaniya.in/${href}`)
    })

    var set = new Set(hrefArray);
    const array = Array.from(set);


    console.log(array);
    for (let index = 0; index < array.length; index++) {
        await scrape2(array[index])
    }



}

const scrape2 = async (url) => {
    const response = await fetchdata(url)
    const body = await response.text();
    const $ = cheerio.load(body)


    // var link = ''  
    var title = ''
    var fullstory = []
    var writer = ''
    var publishDate = ''

    // $('div audio').each((i, el) => {
    //     const data = $(el).attr('src')
    //     link = data

    // })

    // if (link.length < 5) {
    //     console.log("link not found");
    //     return;
    // }

    $('div h1').each((i, el) => {
        const data = $(el).text()
        title = data
    })


    $('div.flex div.p-4.bg-orange-100.border-2.border-gray-400.m-2.shadow.rounded-lg div.flex.items-center.text-sm.my-2.space-x-2 p').each((i, el) => {
        const data = $(el).text()
        if (data.includes("-"))
            publishDate = data
    })



    $('div.flex div.p-4.bg-orange-100.border-2.border-gray-400.m-2.shadow.rounded-lg div.flex.items-center.text-sm.my-2.space-x-2 div:nth-child(1)').each((i, el) => {
        const data = $(el).text()
        writer = data
    })



    $('div p.text-gray-800.text-lg').each((i, el) => {
        const data = $(el).text()
        fullstory.push(data)
    })

    finalDataArray.push({ title: title, story: fullstory, author: writer, date: publishDate })
}

for (let index = 0; index < 4; index++) {


}
var index = 4;

for (let i = 0; i < 2; i++) {
    for (let i = 1; i < 7; i++) {
        await scrape(`https://www.desikahaniya.in/category/${categories[index].href}/page/${i}`)
    }
    console.log(`PAGE-${categories[index].href} COMPLETED!`);
    fs.writeFileSync(`JsonData/Android/${categories[index].href}.json`, JSON.stringify(finalDataArray));
    console.table(finalDataArray.length);
    finalDataArray = []
}
