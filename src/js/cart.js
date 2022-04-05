function _addItemToCart() {
  let cart = []
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  cart = JSON.parse(localStorage.getItem("cart")) || []

  const cartContainsDressId = cart.some(item => item.id === window.__DATA__.id)
  if (cartContainsDressId) {
    alert(`${window.__DATA__.name} ist bereits im Warenkorb`)
    return
  }

  cart = []
  cart.push(window.__DATA__)
  localStorage.setItem("cart", JSON.stringify(cart))

  _updateCartPointer()
}

function _updateCartPointer() {
  const cartPointerTopRight = document.querySelectorAll("div[class*=anzahl-warenkorb]")
  cartPointerTopRight.forEach(pointer => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    pointer.innerHTML = `${cart.length}`
  })
}

export function _onCartButtonClickEvent() {
  const cartButtonsCenter = document.querySelectorAll("div[class*='warenkorb-button-mitte']")
  cartButtonsCenter.forEach(button => button.addEventListener("mouseup", () => _addItemToCart()))
}

function _getTotalPrice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  const total = cart
    .map(item => parseFloat(item.price.replace(",", ".")))
    .reduce((prev, curr) => prev + curr, 0)

  return total.toFixed(2)
}

export function _renderCartList() {
  _updateCartPointer()
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  if (!cart[0]) {
    _removeItemFromCart()
    return
  }

  const nameElements = document.querySelectorAll("div[class*='kleidchenbezeichnung']")
  const imageElements = document.querySelectorAll("img[class*='vorderseiteklein']")
  const deleteButtons = document.querySelectorAll("div[class*='lschen']")
  const priceElements = document.querySelectorAll("div[class*='preis1']")
  const totalPriceElements = document.querySelectorAll("div[class*='gesamtpreis1']")
  const shippingElements = document.querySelectorAll("div[class*='versand-5-7']")
  console.log(nameElements);
  console.log(imageElements);
  console.log(deleteButtons);
  console.log(priceElements);
  console.log(totalPriceElements);
  console.log(shippingElements);

  nameElements.forEach(element => element.innerHTML = cart[0].name)
  imageElements.forEach(element => {
    element.setAttribute("style", "object-fit: contain;")
    element.src = cart[0].images.front
  })
  deleteButtons.forEach(element => {
    element.setAttribute("style", "cursor: pointer;")
    element.addEventListener("mouseup", () => _removeItemFromCart())
  })
  priceElements.forEach(element => element.innerHTML = `${cart[0].price} €`)
  totalPriceElements.forEach(element => element.innerHTML = `${_getTotalPrice()} €`)
}

function _removeItemFromCart() {
  localStorage.clear()

  document.querySelectorAll("div[class*='kleidchenbezeichnung']").forEach(element => element.remove())
  document.querySelectorAll("img[class*='vorderseiteklein']").forEach(element => element.remove())
  document.querySelectorAll("div[class*='lschen']").forEach(element => element.remove())
  document.querySelectorAll("div[class*='preis1']").forEach(element => element.remove())
  document.querySelectorAll("div[class*='versand-5-7']").forEach(element => element.remove())

  _updateCartPointer()
}
