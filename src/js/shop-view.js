console.log("shop-view")

import { _renderNotAvailableNfts } from "./render.js"
import { _getAvailableNftsFromCollectionOne } from "./fetch.js"

if (!window.sessionStorage.getItem("nfts")) {
  await _getAvailableNftsFromCollectionOne()
} else {
  _renderNotAvailableNfts()
}
