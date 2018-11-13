const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const url = req.query.url;
  const screenWidth = parseInt(req.query.screenwidth, 10);
  console.log('url', url, 'screenwidth', screenWidth);

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({width: screenWidth, height: screenWidth});

    await page.goto(url, {waitUntil: 'networkidle0', timeout: 120000});

    const screenshot = await page.screenshot({
      path: `screenshots/${new Date().getTime()}.png`,
      fullPage: true
    });

    await browser.close();

    res.render('index', {
      title: 'Make a screenshot',
      screenshot: `data:image/png;base64,${Buffer(screenshot).toString('base64')}`,
      screenWidth: screenWidth,
      url: url
    });
  } catch (err) {
    console.log('error', err);
    res.render('error', { error: {status: 400, stack: 'error'} });
  }
});

module.exports = router;
