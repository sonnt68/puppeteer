const puppeteer = require('puppeteer');
let justTime = Date.now()
const selector = 'iframe.slide-show'

async function screenShot () {
  const browser = await puppeteer.launch({ headless: false },
    {executablePath: '~/Applications/Google/Chrome.app'});
  let pageSetCookie = await browser.newPage();
  let pageRoom = await browser.newPage();
  await pageSetCookie.goto('http://link');
  await pageSetCookie.waitForSelector('div');
  await pageRoom.goto('http://link', { waitUntil: 'networkidle2' });
  await Promise.all([
    pageRoom.waitForSelector(selector),
    pageRoom.once('load', () => console.log(`De ${justTime} loaded!`)),
  ]);
  // await pageRoom.waitFor(3000);
  // await pageRoom.click(selector)
  await pageRoom.waitFor(5000);
  await pageRoom.screenshot({path: `pc-interval/f5-student-${justTime}.png`});
  await browser.close();
  // await setTimeout(()=>{
  //   justTime = Date.now()
  //   screenShot()
  // },1000)
}
screenShot()
