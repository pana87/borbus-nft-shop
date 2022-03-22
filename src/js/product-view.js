import { addToCart } from "./cart.js"

export function _renderProductView() {
  const nameElements = document.querySelectorAll("div[class*='bezeichnung']")
  nameElements.forEach(element => element.innerHTML = `${window.__DATA__.name}`)

  const priceElements = document.querySelectorAll("div[class*='stckpreis']")
  priceElements.forEach(element => element.innerHTML = `${window.__DATA__.price} €`)

  const cartButtonsCenter = document.querySelectorAll("div[class*='warenkorb-button-mitte']")
  cartButtonsCenter.forEach(button => {
    button.addEventListener("click", () => addToCart())
  })

  const infoTextElements = document.querySelectorAll("div[class*='infotext']")
  infoTextElements.forEach(element => element.innerHTML = `${window.__DATA__.name} <br />${window.__DATA__.description}`)

  const attributeElements = document.querySelectorAll("div[class*='vertraeglichkeit']")
  attributeElements.forEach(element => element.innerHTML = `${window.__DATA__.attributes.compatibility[0]} & ${window.__DATA__.attributes.compatibility[1]}`)

  const sizeElements = document.querySelectorAll("div[class*='groesse']")
  sizeElements.forEach(element => element.innerHTML = `${window.__DATA__.attributes.size}`)

  const materialElements = document.querySelectorAll("div[class*='stoff']")

  const patternElements = document.querySelectorAll("div[class*='muster']")

}
