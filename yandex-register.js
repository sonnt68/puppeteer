const puppeteer = require('puppeteer');
const select = require ('puppeteer-select');

const accounts = [
    {
        "name": "***",
        "lastname": "***",
        "email": "***",
        "pass": "***"
    }
]

async function addEmail (pageRegEmail, account) {
  const selectorAdd = 'div.department-footer.section-footer > div > button'
  await pageRegEmail.waitForSelector(selectorAdd)
  await pageRegEmail.click(selectorAdd)
  const element = await select(pageRegEmail).getElement('div.menu-item:contains(Add a person)');
  await element.click()
  
  
  const navigationPromise = pageRegEmail.waitForNavigation()
  //click type email
  
  await pageRegEmail.waitForSelector('.modal-box')
  await pageRegEmail.type('input[name="name[last][ru]"]', account.lastname)
  await pageRegEmail.type('input[name="name[first][ru]"]', account.name)
  await pageRegEmail.click('form > div:nth-child(2) > div:nth-child(5) > div > div.form__value > div > button')
  const elementLanguage = await select(pageRegEmail).getElement('div.menu-item:contains(English)');
  await elementLanguage.click()
  // await pageRegEmail.click('form > div:nth-child(2) > div:nth-child(6) > div > div.form__value > div > button')
  // const elementTimeZone = await select(pageRegEmail).getElement('div.menu-item:contains((UTC+07:00) Ho Chi Minh, Hanoi, Trà Vinh)');
  // console.log('elementTimeZone',elementTimeZone)
  // await elementTimeZone.click()
  await pageRegEmail.type('form > div:nth-child(2) > div:nth-child(7) > div > div.form__value > div > div.date-picker__date > div > span > span > input', '01')
  const element1 = await select(pageRegEmail).getElement('span.button__text:contains(Month)');
  await element1.click()
  const element2 = await select(pageRegEmail).getElement('div.menu-item:contains(January)');
  await element2.click()
  await pageRegEmail.type('form > div:nth-child(2) > div:nth-child(7) > div > div.form__value > div > div.date-picker__year > div > span > span > input', '1990')
  const element3 = await select(pageRegEmail).getElement('span.ui-button-group__caption:contains(Male)');
  await element3.click()

  
  await pageRegEmail.type('form > div.form__item.form__item_required.user-nickname > div > div.form__value > div > span > span > input', account.email)
  await pageRegEmail.type('form > div:nth-child(5) > div:nth-child(1) > div > div.form__value > div > span > span > input', account.pass)
  await pageRegEmail.type('form > div:nth-child(5) > div:nth-child(2) > div > div.form__value > div > span > span > input', account.pass)
  await pageRegEmail.click('form > div.form__buttons.form__buttons_aligned > button.control.button2.button2_view_classic.button2_size_m.button2_theme_action.button2_type_submit')
  await pageRegEmail.waitFor(10000)
  await pageRegEmail.reload()

}
async function init () {
  const browser = await puppeteer.launch({ headless: false },
    {executablePath: '~/Applications/Google/Chrome.app'});
  let pageRegEmail = await browser.newPage();

  await pageRegEmail.goto('https://connect.yandex.com/portal/admin');

  const navigationPromise = pageRegEmail.waitForNavigation()
  //login
  await pageRegEmail.waitForSelector('input[type="text"]')
  await pageRegEmail.type('input[type="text"]', '***')
  await pageRegEmail.click('button[type="submit"]')

  await navigationPromise

  await pageRegEmail.waitForSelector('input[type="password"]')
  await pageRegEmail.type('input[type="password"]', '***')
  await pageRegEmail.click('button[type="submit"]')

  await navigationPromise
  //click add email
  for (const account of accounts) {
    await addEmail(pageRegEmail, account)
  }

}
init()
