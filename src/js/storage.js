import { _getAvailableNftsFromCollectionOne } from "./fetch.js"

export async function _getNfts() {
  return new Promise(async (resolve, reject) => {
    if (!window.sessionStorage.getItem("nfts")) {
      alert("Es wurden keine NFTs gefunden. Die Seite wird neu geladen sobald Nfts gefunden wurden.") // statt alert wie ein lade balken angezeigt
      await _getAvailableNftsFromCollectionOne()
      resolve(JSON.parse(window.sessionStorage.getItem("nfts")))
    }
    resolve(JSON.parse(window.sessionStorage.getItem("nfts")))
  })
}

export async function _getNftsFromNftStorage() {
  return new Promise(async (resolve, reject) => {
    const nftsMetadata = []
    const nfts = await _getNfts()

    // dont use for each with fetch. use for loop instead
    nfts.forEach(async (nft, index, array) => {
      const response = await fetch(`https://ipfs.io/ipfs/${nft.metadata}`)
      const data = await response.text()

      nftsMetadata.push(JSON.parse(data))

      if (index + 1 === array.length) resolve(nftsMetadata)
    })
  })
}

export async function _getAvailableNfts() {
  return new Promise(async (resolve, reject) => {
    const nftsMetadata = []
    const nfts = await _getNfts()
    const availableNfts = nfts.filter(it => it.treasuryId === it.owner)

    for (const nft of availableNfts) {
      const response = await fetch(`https://ipfs.io/ipfs/${nft.metadata}`)
      const data = await response.text()

      nftsMetadata.push(JSON.parse(data))
    }
    resolve(nftsMetadata)
  })
}

export function _getCart() {
  return new Promise((resolve, reject) => {
    if (!window.localStorage.getItem("cart")) {
      resolve([])
    }
    resolve(JSON.parse(window.localStorage.getItem("cart")))
  })
}
