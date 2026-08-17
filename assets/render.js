const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 2400, height: 2400 }
  });

  await page.goto('file://' + __dirname + '/render.html', { waitUntil: 'networkidle' });
  
  // Wait for fonts to load
  await page.waitForTimeout(2000);
  
  await page.screenshot({ 
    path: __dirname + '/post.png',
    type: 'png',
    fullPage: true,
    deviceScaleFactor: 2
  });

  await browser.close();
  console.log('✅ Image rendered: post.png');
})();
