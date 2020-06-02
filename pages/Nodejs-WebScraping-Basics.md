---
title: Using Nodejs and Puppeteer to Scrape a Site.
excerpt: "This is a basic example of how to use puppeteer to scrape a site with pagination"
date: 2019-12-21
tags: ["nodejs"]
keywords: "nodejs, web scraping"
cover_image: ""
---

# Using Nodejs and Puppeteer to Scrape a Site
<br>
<hr>
<br>

**npm i puppeteer**  (This will also install chromium.)

```javascript
// require the puppeteer package
const puppeteer = require("puppeteer");

// create self invoking function
(async () => {
  const browser = await puppeteer.launch({
    headless: false, // default is true
    defaultViewport: null // use full page width
  });
  const page = await browser.newPage();
  await page.goto(
    "https://clicks.co.za/beauty/fragrances/c/OH200004?q=%3Arelevance%3Acategory%3AOH300032&text=&count=30"
  );

  let nextBtnIsAvailable = true;
  let allResults = [];

  while (nextBtnIsAvailable === true) {
    // The evaluate function is where you can interact with the DOM.
    let data = await page.evaluate(async () => {
      let results = [];
      const items = Array.from(document.querySelectorAll("div.productBlock"));
      items.forEach(item => {
        results.push({
          src: item.querySelector("a > img").getAttribute("src"),
          price: item
            .querySelector(".detailContent > .price-wrap > .price")
            .textContent.replace(/[\r\n]/g, "")
            .trim(),
          brand: item
            .querySelector(".detailContent a h5")
            .getAttribute("title"),
          description: item.querySelector(".detailContent .product-name p")
            .textContent,
          onPromotion: item.querySelector(".badges.promotionsSticker img")
            ? true
            : false,
          inStock: !item
            .querySelector(".add_to_cart_form button.btn")
            .textContent.includes("Out of stock")
        });
      });
      return results;
    });
    // Merge the array data from each page into the allResults array.
    allResults = [...allResults, ...data];

    // checks if the next page link is available
    try {
      const nextBtn = await page.waitForSelector(
        "div.lastBox.nextBtn > a",
        {
          timeout: 5000
        }
      );
      if (nextBtn) {
        nextBtnIsAvailable = true;
      } else {
        nextBtnIsAvailable = false;
      }
    } catch (err) {
      nextBtnIsAvailable = false;
    }

    // If the next page link is available click it.
    if (nextBtnIsAvailable === true) {
      await page.click(
        "div.lastBox.nextBtn > a"
      );
    }
    // Wait for 4 sec before before paging again.
    await page.waitFor(4000);
  }
  console.log(allResults);
  browser.close();
})();
```
