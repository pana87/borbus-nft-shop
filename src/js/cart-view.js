console.log("cart view");

import { _removeItemFromCart } from "./render.js"

if (!window.localStorage.getItem("cart")) {
  _removeItemFromCart()
}
