import { _renderData } from "./product.js"
import { _onCartButtonClickEvent, _renderCartList } from "./cart.js"

if (window.__DATA__) {
  _renderData()
  _onCartButtonClickEvent()
}

_renderCartList()
