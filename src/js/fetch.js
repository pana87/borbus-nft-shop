export async function getPriceInHbar(priceInEur) {
  // const response = await fetch("http://localhost:8888/.netlify/functions/hbar-exchange-rate", {
  //   mode: "same-origin"
  // })
  // const body = await response.text()
  // const data = JSON.parse(body)

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

export async function renderCollectionOne() {
  let data
  let count = 0
  while (count !== 3) {
    try {
      data = await _getAvailableNftsFromCollectionOne()
      count = 3
    } catch (error) {
      console.error("Could not fetch", error)
      count++
    }
  }

  const notAvailableNfts = data.filter(it => it.treasuryId !== it.owner)

  notAvailableNfts.forEach(nft => {
    const notAvailableElements = document.querySelectorAll(`div[class*='kleidchen-${nft.serial}']`)
    const notAvailableElementParents = []
    notAvailableElements.forEach(element => {
      notAvailableElementParents.push(element.parentElement)
    })

    notAvailableElementParents.forEach(parent => {
      parent.innerHTML = /*html*/`
        <div style="display: flex; flex-direction: column; align-items: center; line-height: 2; opacity: 0.6;">
          <img src="${window.__DATA__[nft.serial - 1].images.front}" style="width: 100%; " />
          <div class="sold" style="padding-top: 20px; color: red;">Verkauft</div>
          <div class="owner" style="padding-top: 10px;">Besitzer: ${nft.owner}</div>
        </div>
      `
    })
  })
}

async function _getAvailableNftsFromCollectionOne() {
  // use xhr instead, then no need for try catch
  const response = await fetch("http://localhost:8888/.netlify/functions/check-collection-one-availability", {
    mode: "same-origin"
  })
  const body = await response.text()
  return JSON.parse(body)
}
