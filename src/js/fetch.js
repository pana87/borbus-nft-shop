import { _renderNotAvailableNfts } from "./render.js"

export async function getPriceInHbar(priceInEur) {
  const data = await _getHbarExchangeRate()

  const USD_EUR = parseFloat(data.USD_EUR)
  const HBAR_USD = parseFloat(data.HBAR_USD)

  const priceInDollar = priceInEur / USD_EUR
  const priceInHbar = priceInDollar / HBAR_USD
  return priceInHbar
}

async function _getHbarExchangeRate() {
  const response = await fetch("http://localhost:8888/.netlify/functions/hbar-exchange-rate", {
    mode: "same-origin"
  })
  const body = await response.text()
  return JSON.parse(body)
}

export async function _getAvailableNftsFromCollectionOne() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "http://localhost:8888/.netlify/functions/check-collection-one-availability")

    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.overrideMimeType("text/html")

    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("fetch erfolg");

        const data = JSON.parse(xhr.response)
        window.sessionStorage.setItem("nfts", JSON.stringify(data))

        _renderNotAvailableNfts()
        resolve()
      } else {
        console.log("fetch fehlgeschlagen.. retry");

        _getAvailableNftsFromCollectionOne()
      }
    }

    xhr.send()
  })
}
