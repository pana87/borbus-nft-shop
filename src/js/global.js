console.log("global js");
import "./buttons.js"

import { _updateCartPointer } from "./render.js"

import { _renderNotAvailableNfts } from "./render.js"
import { _getAvailableNftsFromCollectionOne } from "./fetch.js"
console.log(window.location.pathname);
if (!window.sessionStorage.getItem("nfts")) {
  await _getAvailableNftsFromCollectionOne()
} else {
  if (window.location.pathname === "/shop/") {
    _renderNotAvailableNfts()
  }
}



_updateCartPointer()
