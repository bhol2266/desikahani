import fetchdata from 'node-fetch';
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import fs from 'fs';






var finalDataArray = []
const scrape = async (url) => {

  var TitleArray = []
  var authorArray = []
  var dateArray = []
  var viewsArray = []
  var descriptionArray = []
  var hrefArray = []
  var tagsArray = []

  const response = await fetchdata(url)
  const body = await response.text();
  const $ = cheerio.load(body)





  $('.entry-title a').each((i, el) => {

    const data = $(el).text()
    const href = $(el).attr("href")
    TitleArray.push(data)
    hrefArray.push(href)



  })

  var authorName = []
  var authorHref = []
  $('.author-name').each((i, el) => {
    const data = $(el).text()
    authorName.push(data)

  })

  $('.url.fn.n').each((i, el) => {
    const data = $(el).attr('href')
    authorHref.push(data)
  })

  for (let index = 0; index < authorName.length; index++) {
    authorArray.push({ name: authorName[index], href: authorHref[index] })
  }


  $('.posted-on time').each((i, el) => {

    const data = $(el).text()
    dateArray.push(data)

  })


  $('.post-views-eye').each((i, el) => {

    const data = $(el).text()
    viewsArray.push(data)

  })
  $('.entry-content p:nth-child(1)').each((i, el) => {

    const data = $(el).text()
    descriptionArray.push(data)

  })
  $('.tags-links').each((i, el) => {

    var array = []

    const select = cheerio.load(el)
    select('a').each((i, el) => {
      const data = $(el).text()
      const href = $(el).attr('href')
      array.push({ name: data, href: href })

    })
    tagsArray.push(array)

  })




  for (let index = 0; index < TitleArray.length; index++) {

    finalDataArray.push({
      Title: TitleArray[index],
      author: authorArray[index],
      date: dateArray[index],
      views: viewsArray[index],
      description: descriptionArray[index],
      href: hrefArray[index],
      tags: tagsArray[index],

    })
  }


}







for (let index = 1; index <= 50; index++) {
  await scrape(`https://www.freesexkahani.com/page/${index}/`)
  console.log(`PAGE-${index} COMPLETED!`);
  fs.writeFileSync(`JsonData/stories/stories${index}.json`, JSON.stringify(finalDataArray));
  finalDataArray = []

}


// var paths = []

// for (let index = 1; index <= 50; index++) {
//   paths.push({ params: { page: index.toString() } })
// }

// console.log(paths);




