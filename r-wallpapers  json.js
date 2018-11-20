const fs = require('fs')
// const path = require('path')
// const cheerio = require('cheerio')
// const request = require('request')
const https = require('https')
const http = require('http')
const URL = require('url').URL
const Q = require('q')


const LIMIT="limit=30"
const SORT = "top"
// const SORT_PERIOD = "week"
const SORT_PERIOD = "month"


const SAJT = `https://www.reddit.com/r/wallpapers/${SORT}.json?t=${SORT_PERIOD}&${LIMIT}`
const OUTPUT_FOLDER = 'C:\\Users\\Dre\\Pictures\\wall\\'




https.get(SAJT, (res) => {
  console.log(`Status code: ${res.statusCode}`)
  console.log('`Headers: ' + res.headers)

  let body = ''
  res.on('data', (chunk) => {
    body += chunk
  })

  res.on('end', function () {
    let rddResponse = JSON.parse(body)
    fs.writeFile('walpaper posts.js', JSON.stringify(rddResponse), (err) => {
      if (err) {
        console.log("Greska: ", err);

      }
    })
    console.log("Img title: ", rddResponse.data.children[0].data.title)
    console.log("Img URL: ", rddResponse.data.children[0].data.url)

    rddResponse.data.children.forEach(post => {

      let title = post.data.title
      let src = post.data.url
      
      // console.log(src);
      let srcURL = new URL(src)

      // console.log(srcURL.pathname);

      let outIMG = OUTPUT_FOLDER + title.replace(/[/\\?%*:|"<>]/g, "_") + srcURL.pathname.slice(-4)

      // console.log(outIMG);

      download(srcURL, outIMG)

      // console.log(post.kind);
      
      
    });

  }).on('error', (e) => {
    console.error(e);
  });
})

function download(url, filepath) {
  console.log("Downloading: " + url.href+ " - " + filepath);
  
  var fileStream = fs.createWriteStream(filepath),
    deferred = Q.defer()

  fileStream.on('open', function () {

    if (url.protocol === "https:") {
      https.get(url, function (res) {
        res.on('error', function (err) {
          deferred.reject(err)
        })
  
        res.pipe(fileStream)
      })
    }
    else{
      http.get(url, function (res) {
        res.on('error', function (err) {
          deferred.reject(err)
        })
  
        res.pipe(fileStream)
      })
    }
  }).on('error', function (err) {
    deferred.reject(err)
  }).on('finish', function () {
    deferred.resolve(filepath)
  })

  return deferred.promise
}