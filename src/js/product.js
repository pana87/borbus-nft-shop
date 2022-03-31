export function _renderData() {
  const nameElements = document.querySelectorAll("div[class*='bezeichnung']")
  nameElements.forEach(element => element.innerHTML = `${window.__DATA__.name}`)

  const priceElements = document.querySelectorAll("div[class*='stckpreis']")
  priceElements.forEach(element => element.innerHTML = `${window.__DATA__.price} €`)

  const infoTextElements = document.querySelectorAll("div[class*='infotext']")
  infoTextElements.forEach(element => element.innerHTML = `${window.__DATA__.name} <br />${window.__DATA__.description}`)

  const attributeElements = document.querySelectorAll("div[class*='vertraeglichkeit1']")
  attributeElements.forEach(element => element.innerHTML = window.__DATA__.attributes.compatibility.join(" & "))

  const sizeElements = document.querySelectorAll("div[class*='groesse1']")
  sizeElements.forEach(element => element.innerHTML = `${window.__DATA__.attributes.size}`)

  const materialElements = document.querySelectorAll("div[class*='stoff1']")
  materialElements.forEach(element => element.innerHTML = `${window.__DATA__.attributes.material.join(", ")}`)

  const patternElements = document.querySelectorAll("div[class*='muster1']")
  patternElements.forEach(element => element.innerHTML = `${window.__DATA__.attributes.pattern}`)

  const productDetailLinks = document.querySelectorAll("a[href*='produktansichtdetail1']")
  productDetailLinks.forEach(link => link.setAttribute("href", `${window.__DATA__.links.detail}`))

  const productLinks = document.querySelectorAll("a[href*='produktansicht1']")
  productLinks.forEach(link => link.setAttribute("href", `${window.__DATA__.links.overview}`))

  const frontImages = document.querySelectorAll("img[class*='vorderseitebild']")
  frontImages.forEach(image => {
    image.setAttribute("style", "object-fit: contain;")
    image.src = `${window.__DATA__.images.front}`
  })

  const backImages = document.querySelectorAll("img[class*='rckseitebild']")
  backImages.forEach(image => {
    image.setAttribute("style", "object-fit: contain;")
    image.src = `${window.__DATA__.images.back}`
  })

  const detailImages = document.querySelectorAll("img[class*='detailaufnahme']")
  detailImages.forEach(image => {
    image.setAttribute("style", "opacity: 0.3 !important;")
    image.src = `${window.__DATA__.images.detail}`
  })
}
