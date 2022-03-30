module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css")
  eleventyConfig.addPassthroughCopy("./src/fonts")
  eleventyConfig.addPassthroughCopy("./src/img")
  eleventyConfig.addPassthroughCopy("./src/js")

  eleventyConfig.addTransform("replace-url", (content) => {
    const url = process.env.URL || "http://localhost:8080"
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

  eleventyConfig.addTransform("add-app-script", (content) => {
    const scriptTag =
`
    <script type="module" src="../js/app.js"></script>
  </body>
`
    const result = content.replace(/<\/body>/, scriptTag)
    return result
  })

  eleventyConfig.addShortcode("expose", data => {
    return `<script id="__EXPOSE__">
    window.__DATA__=${JSON.stringify(data)}
    document.getElementById("__EXPOSE__").remove()
    </script>`
  })

  return {
    dir: {
      input: "./src",
      output: "public",
    }
  }
}
