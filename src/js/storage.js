import { _noAddressFound, _noCartItemFound } from "./exceptions.js"

// export async function getPriceInHbar(priceInEur) {
//   const response = await fetch("http://localhost:8888/.netlify/functions/hbar-exchange-rate", {
//     mode: "same-origin"
//   })
//   const body = await response.text()
//   const data = JSON.parse(body)

//   const USD_EUR = parseFloat(data.USD_EUR)
//   const HBAR_USD = parseFloat(data.HBAR_USD)

//   const priceInDollar = priceInEur / USD_EUR
//   const priceInHbar = priceInDollar / HBAR_USD
//   return priceInHbar
// }

export function getCartListFromLocalStorage() {
  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  if (cart.length === 0) {
    _noCartItemFound()
    return
  }
  return cart
}

export function getAddressesFromLocalStorage() {
  const addresses = JSON.parse(window.localStorage.getItem("addresses")) || []

  if (addresses.length === 0) {
    _noAddressFound()
    return
  }
  return addresses
}
