const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const request = require('request')
const https = require('https')
const URL = require('url').URL


const SAJT = "https://www.reddit.com/r/wallpapers/hot"
const OUTPUT_FOLDER = 'C:\\Users\\Dre\\Pictures\\wall\\'



// SELEKTORI SLIKA

// let slikaDIV1 = '#t3_9pu02j > div._1poyrkZ7g36PawDueRza-J > div > div._38EcSQ9jzVrdtzkXO1cydX > div > div'
// let slikaLNK1 = '#t3_9pu02j > div._1poyrkZ7g36PawDueRza-J > div > div._38EcSQ9jzVrdtzkXO1cydX > div > div > a'
// let slikaNSL1 = '#t3_9pu02j > div._1poyrkZ7g36PawDueRza-J > div > div._1Y6dfr4zLlrygH-FLmr8x- > div.s56cc5r-1.cXWAtw > span > a > h2'

// let slikaDIV2 = '#t3_9ptdw0 > div._1poyrkZ7g36PawDueRza-J > div > div._38EcSQ9jzVrdtzkXO1cydX > div > div'
// let slikaLNK2 = '#t3_9ptdw0 > div._1poyrkZ7g36PawDueRza-J > div > div._38EcSQ9jzVrdtzkXO1cydX > div > div > a'
// let slikaNSL2 = '#t3_9ptdw0 > div._1poyrkZ7g36PawDueRza-J > div > div._1Y6dfr4zLlrygH-FLmr8x- > div.s56cc5r-1.cXWAtw > span > a > h2'


request(SAJT, (err, resp, html) => {
  if (!err) {
    const $ = cheerio.load(html)
    let postoviID = []
    $('._1poyrkZ7g36PawDueRza-J').each((i, el) => {

      // console.log(i);
      let postSubs = []

      let naslov = $(el).find($('h2')).text()

      let src = $(el).find($('img'))[1].attribs.src

      srcURL = new URL(src)
      postoviID.push(postSubs)

      let outIMG = OUTPUT_FOLDER + naslov + srcURL.pathname.slice(-4)
      let linkIMG = 'https://i.redd.it' + srcURL.pathname
  
      console.log(`Downloading: ${naslov}`);

      download(linkIMG, outIMG)
    })


  } else {
    console.log(`err: ${err}/n`);
    console.log(`resp: ${resp}/n`);

  }
})

function download(url, filepath) {
  var fileStream = fs.createWriteStream(filepath),
    deferred = Q.defer()

  fileStream.on('open', function () {
    https.get(url, function (res) {
      res.on('error', function (err) {
        deferred.reject(err)
      })

      res.pipe(fileStream)
    })
  }).on('error', function (err) {
    deferred.reject(err)
  }).on('finish', function () {
    deferred.resolve(filepath)
  })

  return deferred.promise
}