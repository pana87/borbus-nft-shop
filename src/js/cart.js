export function addToCart() {
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
}

// function emptyCart() {
//   // let cart = JSON.parse(localStorage.getItem("cart")) || []
//   const cart = []
//   localStorage.clear()
//   localStorage.setItem("cart", JSON.stringify(cart))
// }

function getTotalPrice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  const total = cart
    .map(item => parseFloat(item.price.replace(",", ".")))
    .reduce((prev, curr) => prev + curr, 0)

  return total.toFixed(2)
}

// Renders a cart list. Maybe for later. Not in the requirements right now.
// function renderCart() {
//   const itemPlaceholder = document.querySelectorAll(".cart-list")
//   const cart = JSON.parse(localStorage.getItem("cart")) || []
//   console.log(cart)

//   const rows = cart.map(item => {
//     return /*html*/`
//       <div class="item">
//         <div class="content" style="display: flex; flex-direction: row; justify-content: space-around;">
//           <img class="item-image" src="${item.images.front}" alt="${item.name}" style="width: 20vw;"/>
//           <div class="item-info" style="">
//             <div class="name">${item.name}</div>
//             <div class="info">Versand 5-7 Werktage</div>
//             <div class="delete-item">Löschen</div>
//           </div>
//           <div class="price">${item.price} €</div>
//         </div>
//       </div>
//     `
//   })

//   const html = `${rows.join()}`
//   itemPlaceholder.forEach(placeholder => placeholder.innerHTML = html)
// }
// renderCart()

// function renderTotalPrice() {
//   const cart = JSON.parse(localStorage.getItem("cart")) || []
//   console.log(cart);
//   const totalPriceElements = document.querySelectorAll("div[class*='gesamtpreis']")
//   totalPriceElements.forEach(element => element.innerHTML = `Gesamtpreis ${getTotalPrice()} €`)

//   const kleidchenElements = document.querySelectorAll("div[class*='kleidchen-1']")
//   console.log(kleidchenElements);
//   kleidchenElements.forEach(element => element.innerHTML = `${cart[0].name}`)

//   const imageElements = document.querySelectorAll("img[class*='enten-kleid-front']")
//   console.log(imageElements);
//   imageElements.forEach(element => element.setAttribute("src", cart[0].images.front))

//   const priceElements = document.querySelectorAll("")
// }
// renderTotalPrice()
