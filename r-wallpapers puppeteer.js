const puppeteer = require('puppeteer');
const CREDS = require('./creds');

const SAJT = "https://www.reddit.com/r/wallpapers/hot/"
const IN_GRAF_1 = "#editor-number-10"
const IN_GRAF_2 = "#editor-number-20"
const KILL_SIDEBAR = '#gpc-toggle > i'
const OUT_GRAF = '#gpc-outer > div.GraphWrapper > div > canvas'; 

// let Graf= 'sqrt x'

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage({headles: false});
  await page.goto(SAJT);
  let post1 = page.$$('._1poyrkZ7g36PawDueRza-J')
//   let postParent = post1

  console.log(post1);
  


  await browser.close();
})();