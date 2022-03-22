import fetchdata from 'node-fetch';
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import fs from 'fs';




const scrape = async (url,index) => {

    var thumbnailArray = []
    var TitleArray = []
    var DateArray = []
    var errorIndex = []
    var FullalbumLink = []

    const response = await fetchdata(url)
    const body = await response.text();
    const $ = cheerio.load(body)



    $('.entry-thumbnail img').each((i, el) => {

        const links = $(el).attr("data-lazy-srcset")
        try {
            let urls = extractUrls(links);
            thumbnailArray.push(urls[0].trim())
        } catch (error) {
            errorIndex.push(i)
        }

    })


    $('.entry-title a').each((i, el) => {

        TitleArray.push($(el).text().trim());
    })

    $('.entry-date').each((i, el) => {

        DateArray.push($(el).text().trim())

    })
    $('.entry-thumbnail').each((i, el) => {

        FullalbumLink.push($(el).attr('href'))

    })



    if (errorIndex.length > 0) {
        for (let index = 0; index < errorIndex.length; index++) {

            delete TitleArray[errorIndex[index]]
            delete DateArray[errorIndex[index]]
            delete FullalbumLink[errorIndex[index]]

        }
    }


    TitleArray = TitleArray.filter(function (element) {
        return element !== undefined;
    });
    DateArray = DateArray.filter(function (element) {
        return element !== undefined;
    });
    FullalbumLink = FullalbumLink.filter(function (element) {
        return element !== undefined;
    });


    // for (let index = 0; index < thumbnailArray.length; index++) {
    //     dataObject.push({
    //         thumbnailUrl: thumbnailArray[index],
    //         title: TitleArray[index],
    //         dataAdded: DateArray[index],
    //         nextLink: FullalbumLink[index],
    //     })
    // }

    // data.nextLink.substring(data.nextLink.indexOf(".co/") + 4, data.nextLink.length)

  

      fs.writeFileSync(`JsonData/pics/page${index}.json`, JSON.stringify(FullalbumLink));


}






for (let index = 1; index <= 50; index++) {
    await scrape(`https://hotdesipics.co/main/page/${index}/`, index)
    console.log(`PAGE-${index} COMPLETED!`);

}






