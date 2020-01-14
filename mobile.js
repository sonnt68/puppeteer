const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 7'];
const selector = 'iframe.slide-show'
let justTime = Date.now()
async function screenShot () {
  const browser = await puppeteer.launch({ headless: true },
    {executablePath: '~/Applications/Google/Chrome.app'});
  let pageSetCookie = await browser.newPage();
  let pageRoom = await browser.newPage();

  await pageSetCookie.goto('http://link', { waitUntil: 'networkidle2' });
  await pageSetCookie.waitForSelector('div');

  await pageRoom.emulate(iPhone);
  await pageRoom.goto('http://link');
  await Promise.all([
    pageRoom.waitForSelector(selector),
    pageRoom.once('load', () => console.log(`De ${justTime} loaded!`)),
  ]);
  await pageRoom.waitFor(3000);
  await pageRoom.tap(selector)
  await pageRoom.waitFor(7000);
  await pageRoom.screenshot({path: `mobile-images/f5-student-${justTime}.png`});
  await browser.close();
  await setTimeout(()=>{
    justTime = Date.now()
    screenShot()
  },1000)
}
screenShot()
