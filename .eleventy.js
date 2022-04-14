const fs = require("fs")

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./static/css")
  eleventyConfig.addPassthroughCopy("./static/fonts")
  eleventyConfig.addPassthroughCopy("./static/img")

  eleventyConfig.addPassthroughCopy({"./src/js": "./js"})

  eleventyConfig.addTransform("replace-url", (content) => {
    const url = process.env.URL || "http://localhost:8888"
    const result = content.replace(/https:\/\/borbus-shop.com/g, url)
    return result
  })

  eleventyConfig.addTransform("replace-css-paths", (content) => {
    const result = content.replace(/css\//g, "../css/")
    return result
  })

  eleventyConfig.addTransform("replace-img-paths", (content) => {
    const result = content.replace(/img\//g, "../img/")
    return result
  })

  eleventyConfig.addTransform("add-global-script", (content) => {

    const scriptTag =
`
    <script type="module" src="../js/global.js"></script>
  </body>
`
    const result = content.replace(/<\/body>/, scriptTag)
    return result
  })

  eleventyConfig.addShortcode("expose", data => {
    return `
      <script id="__EXPOSE__">
        window.__DATA__=${JSON.stringify(data)}
        document.getElementById("__EXPOSE__").remove()
      </script>
    `
  })

  eleventyConfig.on("eleventy.before", async () => {

    if (fs.existsSync("./static/shop.html")) {
      fs.renameSync("./static/shop.html", "./static/shop.njk")
      const fileBuffer = fs.readFileSync("./static/shop.njk")

      const result = fileBuffer.toString().replace(/<\/body>/, `
    {% expose items %}
    <script type="module" src="../js/shop-view.js"></script>
  </body>
      `)
      fs.writeFileSync("./static/shop.njk", result, "utf-8")
    }


    if (fs.existsSync("./static/produktansicht.html")) {
      fs.renameSync("./static/produktansicht.html", "./static/produktansicht.njk")
      const fileBuffer = fs.readFileSync("./static/produktansicht.njk")

      const result = fileBuffer.toString().replace(/<!DOCTYPE html>/, `---
pagination:
  data: items
  size: 1
permalink: "produktansicht{{ pagination.pageNumber + 1 }}/index.html"
---
<!DOCTYPE html>
      `).replace(/<\/body>/, `
    {% expose items[pagination.pageNumber] %}
    <script type="module" src="../js/product-view.js"></script>
  </body>
      `)

      fs.writeFileSync("./static/produktansicht.njk", result, "utf-8")
    }

    if (fs.existsSync("./static/produktansichtdetail.html")) {
      fs.renameSync("./static/produktansichtdetail.html", "./static/produktansichtdetail.njk")
      const fileBuffer = fs.readFileSync("./static/produktansichtdetail.njk")

      const result = fileBuffer.toString().replace(/<!DOCTYPE html>/, `---
pagination:
  data: items
  size: 1
permalink: "produktansichtdetail{{ pagination.pageNumber + 1 }}/index.html"
---
<!DOCTYPE html>
      `).replace(/<\/body>/, `
    {% expose items[pagination.pageNumber] %}
    <script type="module" src="../js/product-view.js"></script>
  </body>
      `)

      fs.writeFileSync("./static/produktansichtdetail.njk", result, "utf-8")
    }

    if (fs.existsSync("./static/css/globals.css")) {
      const fileBuffer = fs.readFileSync("./static/css/globals.css")
      const searchString = `@import url("https://px.animaapp.com/61aa0c1637bc8119fc5ecef2.61aa0c181a3b9f9d45993252.sBlExfs.hcp.png");`

      if (fileBuffer.toString().includes(searchString)) {
        const result = fileBuffer.toString().replace(/@import url\("https:\/\/px\.animaapp\.com\/61aa0c1637bc8119fc5ecef2\.61aa0c181a3b9f9d45993252\.sBlExfs\.hcp\.png"\);/, "")
        fs.writeFileSync("./static/css/globals.css", result, "utf-8")
      }
    }
  })

  return {
    dir: {
      input: "./static",
      output: "./public",
      data: "../src/_data"
    }
  }
}
