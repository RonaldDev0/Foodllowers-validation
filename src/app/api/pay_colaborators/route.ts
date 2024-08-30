import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

const userName = process.env.NEXT_PUBLIC_USERNAME!
const account = process.env.NEXT_PUBLIC_IRIS_ACCOUNT!
const password = 'G7m$kP2#dT9w!rL4%qXz'

export async function GET () {
  console.log({ userName, account, password })
  // set puppeteer options
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })

  // login
  await page.goto('https://empresas.iris.com.co/login')
  await page.type('#user-name', userName)
  await page.type('#account', account)
  await page.type('#password', password)
  await page.click('.btn')
  await new Promise(resolve => setTimeout(resolve, 10000))

  // // goto transfer page
  // await page.goto('https://empresas.iris.com.co/transfer/batch-transfer')
  // await new Promise(resolve => setTimeout(resolve, 5000))

  // save Buffer screenshot
  const screenshotBuffer = await page.screenshot()
  await new Promise(resolve => setTimeout(resolve, 2000))

  // logout and close browser
  // await page.goto('https://empresas.iris.com.co/dashboard')
  // await new Promise(resolve => setTimeout(resolve, 5000))
  await page.click('.submit')
  await page.click('.btn')
  await browser.close()

  return new NextResponse(screenshotBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'attachment; filename=screenshot.png'
    }
  })
}
