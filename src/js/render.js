import { getPriceInHbar } from "./fetch.js"
import {
  _noUserSessionFound,
  _noAccountIdFound,
  _noCartItemFound,
  _noUserFound,
  _noAddressFound,
} from "./exceptions.js"
import { _getAvailableNfts, _getCart, _getNfts, _getNftsFromNftStorage } from "./storage.js"

export async function _updateCartPointer() {
  const cartPointerTopRight = document.querySelectorAll("div[class*='anzahl-warenkorb']")

  if (cartPointerTopRight.length === 0) return

  const cart = await _getCart()
  cartPointerTopRight.forEach(pointer => pointer.innerHTML = `${cart.length}`)
}
_updateCartPointer()

export function _removeItemFromCart() {
  document.querySelectorAll("div[class*='kleidchenbezeichnung']").forEach(element => element.remove())
  document.querySelectorAll("img[class*='vorderseitebild']").forEach(element => element.remove())
  document.querySelectorAll("div[class*='lschen']").forEach(element => element.remove())
  document.querySelectorAll("div[class*='preis1']").forEach(element => element.remove())
  document.querySelectorAll("div[class*='versand-5-7']").forEach(element => element.remove())

  _updateCartPointer()
}

export async function _renderShopList() {
  const shopListDivs = document.querySelectorAll("div[class*='shopliste']")

  if (shopListDivs.length === 0) return

  if (!window.__DATA__) return

  const nfts = await _getAvailableNfts()

  if (nfts.length === 0) return

  const nftContainer = []
  nfts.forEach(nft => {
    const dressId = nft.name.match(/\d+/)[0]
    const nftBox = document.createElement("div")
    nftBox.setAttribute("class", "item")
    nftBox.setAttribute("style", `
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90%;
      margin-bottom: 100px;
    `)

    if (window.innerWidth > 767) {
      nftBox.setAttribute("style", `
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 30%;
        margin-bottom: 100px;
      `)
    }

    nftBox.innerHTML = `
      <a href="${window.__DATA__[dressId - 1].links.overview}">
        <img src="${nft.image}" alt="${nft.name}" style="width: 100%; object-fit: contain;"/>
      </a>
      <p>Kleidchen #${dressId}</p>
      <p>${window.__DATA__[dressId - 1].price} €</p>
      <a href="${window.__DATA__[dressId - 1].links.overview}" style="color: inherit;" >Einkaufen ᐅ</a>
    `
    nftContainer.push(nftBox)
  })

  if (nftContainer.length === 0) return

  shopListDivs.forEach(div => {
    div.innerHTML = ""

    div.style.position = "relative"
    div.style.bottom = "0"
    div.style.left = "0"
    div.style.top = "350px"
    div.style.width = "100%"
    div.style.height = "100%"
    div.style.paddingBottom = "800px"
    div.style.display = "flex"
    div.style.flexWrap = "wrap"
    div.style.justifyContent = "space-around"
    div.style.alignItems = "center"
    div.parentElement.style.height = "auto"

    nftContainer.forEach(container => div.innerHTML += container.outerHTML)
  })

  const articleDivs = document.querySelectorAll("div[class*='x24-artikel']")

  if (articleDivs.length === 0) return

  articleDivs.forEach(div => div.innerHTML = `${nfts.length} Artikel`)
}
_renderShopList()

export async function _renderFrontImage() {
  const divs = document.querySelectorAll("div[class*='vorderseitebild']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => {
      div.innerHTML = `
        <img src="${window.__DATA__.images.front}" alt="${window.__DATA__.name}" style="object-fit: contain; width: 100%;" />
      `
    })
    return
  }

  const cart = await _getCart()

  if (cart.length !== 0) {
    divs.forEach(div => {
      div.innerHTML = `
        <img src="${cart[0].images.front}" alt="${cart[0].name}" style="object-fit: contain; width: 100%;" />
      `
    })
    return
  }
}
_renderFrontImage()

function _renderBackImage() {
  const divs = document.querySelectorAll("div[class*='rckseitebild']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => {
      div.innerHTML = `
        <img src="${window.__DATA__.images.back}" alt="${window.__DATA__.name}" style="object-fit: contain; width: 100%;" />
      `
    })
    return
  }
}
_renderBackImage()

async function _renderName() {
  const divs = document.querySelectorAll("div[class*='kleidchenbezeichnung']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `${window.__DATA__.name}`)
    return
  }

  const cart = await _getCart()

  if (cart.length !== 0) {
    divs.forEach(div => div.innerHTML = `${cart[0].name}`)
    return
  }
}
_renderName()

async function _renderPrice() {
  const divs = document.querySelectorAll("div[class*='stckpreis']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `${window.__DATA__.price} €`)
    return
  }

  const cart = await _getCart()

  if (cart.length !== 0) {
    divs.forEach(div => div.innerHTML = `${cart[0].price} €`)
    return
  }
}
_renderPrice()

function _renderInfoText() {
  const divs = document.querySelectorAll("div[class*='infotext']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `
    ${window.__DATA__.name} <br />
    ${window.__DATA__.description}
    `)
    return
  }
}
_renderInfoText()

function _renderCompatibility() {
  const divs = document.querySelectorAll("div[class*='vertraeglichkeit1']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `${window.__DATA__.attributes.compatibility[0]} & ${window.__DATA__.attributes.compatibility[1]}`)
    return
  }
}
_renderCompatibility()

function _renderSize() {
  const divs = document.querySelectorAll("div[class*='groesse1']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `${window.__DATA__.attributes.size}`)
    return
  }
}
_renderSize()

function _renderMaterial() {
  const divs = document.querySelectorAll("div[class*='stoff1']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `${window.__DATA__.attributes.material}`)
    return
  }
}
_renderMaterial()

function _renderPattern() {
  const divs = document.querySelectorAll("div[class*='muster1']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => div.innerHTML = `${window.__DATA__.attributes.pattern}`)
    return
  }
}
_renderPattern()

function _renderDetailLinks() {
  const links = document.querySelectorAll("a[href*='produktansichtdetail1']")

  if (links.length === 0) return

  if (window.__DATA__) {
    links.forEach(link => link.setAttribute("href", `${window.__DATA__.links.detail}`))
    return
  }
}
_renderDetailLinks()

function _renderLinks() {
  const links = document.querySelectorAll("a[href*='produktansicht1']")

  if (links.length === 0) return

  if (window.__DATA__) {
    links.forEach(link => link.setAttribute("href", `${window.__DATA__.links.overview}`))
    return
  }
}
_renderLinks()

function _renderDetailImage() {
  const divs = document.querySelectorAll("div[class*='detailaufnahme']")

  if (divs.length === 0) return

  if (window.__DATA__) {
    divs.forEach(div => {
      div.innerHTML = `
        <img src="${window.__DATA__.images.detail}" alt="${window.__DATA__.name}" style="object-fit: contain; width: 100%; opacity: 0.3;"/>
      `
    })
    return
  }
}
_renderDetailImage()

async function _renderCartList() {
  if (window.location.pathname === "/warenkorb/") {
    const cart = await _getCart()
    if (cart.length === 0) {
      _noCartItemFound()
      return
    }
  }
}
_renderCartList()

async function _renderTotalPrice() {
  const divs = document.querySelectorAll("div[class*='gesamtpreis1']")

  if (divs.length === 0) return

  const cart = await _getCart()

  const total = cart
  .map(item => parseFloat(item.price.replace(",", ".")))
  .reduce((prev, curr) => prev + curr, 0)

  if (cart.length === 0) {
    divs.forEach(div => div.remove())
    return
  }

  if (cart.length !== 0) {
    divs.forEach(div => div.innerHTML = `${total.toFixed(2)} €`)
    return
  }
}
_renderTotalPrice()









function _accountId() {
  const accountIdElements = document.querySelectorAll("div[class*='account-id-einzigartig']")

  if (accountIdElements.length === 0) return

  if (!window.sessionStorage.getItem("userSession")) {
    _noUserSessionFound()
    return
  }

  const userSession = JSON.parse(window.sessionStorage.getItem("userSession"))

  if (!userSession.accountId) {
    _noAccountIdFound()
    return
  }
  accountIdElements.forEach(element => {
    element.innerHTML = userSession.accountId
  })
}
// _accountId()

// function _updateAddressName(cssSelector) {
//   const elements = document.querySelectorAll(cssSelector)

//   if (elements.length === 0) return

//   if (!window.localStorage.getItem("addresses")) {
//     _noAddressFound()
//     return
//   }

//   const addresses = JSON.parse(window.localStorage.getItem("addresses"))

//   if (cssSelector === "div[class*='kundennameinput1']") {
//     elements.forEach(element => {
//       element.innerHTML = addresses.filter(it => it.shippingAddress === true)[0].name
//     })
//   }

//   if (cssSelector === "div[class*='kundennameinput2']") {
//     elements.forEach(element => {
//       element.innerHTML = addresses.filter(it => it.billingAddress === true)[0].name
//     })
//   }
// }
// _updateAddressName("div[class*='kundennameinput1']")
// _updateAddressName("div[class*='kundennameinput2']")

// function _updateAddressStreet(cssSelector) {
//   const elements = document.querySelectorAll(cssSelector)

//   if (elements.length === 0) return

//   if (!window.localStorage.getItem("addresses")) {
//     _noAddressFound()
//     return
//   }

//   const addresses = JSON.parse(window.localStorage.getItem("addresses"))

//   if (cssSelector === "div[class*='kundenstrasseinput1']") {
//     elements.forEach(element => {
//       element.innerHTML = addresses.filter(it => it.shippingAddress === true)[0].street
//     })
//   }

//   if (cssSelector === "div[class*='kundenstrasseinput2']") {
//     elements.forEach(element => {
//       element.innerHTML = addresses.filter(it => it.billingAddress === true)[0].street
//     })
//   }
// }
// _updateAddressStreet("div[class*='kundenstrasseinput1']")
// _updateAddressStreet("div[class*='kundenstrasseinput2']")

// function _updateAddressZip(cssSelector) {
//   const elements = document.querySelectorAll(cssSelector)

//   if (elements.length === 0) return

//   if (!window.localStorage.getItem("addresses")) {
//     _noAddressFound()
//     return
//   }

//   const addresses = JSON.parse(window.localStorage.getItem("addresses"))

//   if (cssSelector === "div[class*='kundenplzinput1']") {
//     elements.forEach(element => {
//       element.innerHTML = addresses.filter(it => it.shippingAddress === true)[0].zip
//     })
//   }

//   if (cssSelector === "div[class*='kundenplzinput2']") {
//     elements.forEach(element => {
//       element.innerHTML = addresses.filter(it => it.billingAddress === true)[0].zip
//     })
//   }
// }
// _updateAddressZip("div[class*='kundenplzinput1']")
// _updateAddressZip("div[class*='kundenplzinput2']")

// function _updateAddressEmail(cssSelector) {
//   const elements = document.querySelectorAll(cssSelector)

//   if (elements.length === 0) return

//   if (!window.localStorage.getItem("addresses")) {
//     _noAddressFound()
//     return
//   }

//   const addresses = JSON.parse(window.localStorage.getItem("addresses"))

//   if (cssSelector === "div[class*='kundenemailinput1']") {
//     elements.forEach(element => {
//       element.innerHTML = addresses.filter(it => it.shippingAddress === true)[0].email
//     })
//   }

//   if (cssSelector === "div[class*='kundenemailinput2']") {
//     elements.forEach(element => {
//       element.innerHTML = addresses.filter(it => it.billingAddress === true)[0].email
//     })
//   }
// }
// _updateAddressEmail("div[class*='kundenemailinput1']")
// _updateAddressEmail("div[class*='kundenemailinput2']")

// function _billingAddressName() {
//   const elements = document.querySelectorAll("div[class*='kundennameinput2']")

//   if (elements.length === 0) return

//   if (!window.localStorage.getItem("addresses")) {
//     _noAddressFound()
//     return
//   }

//   const addresses = JSON.parse(window.localStorage.getItem("addresses"))
//   elements.forEach(element => {
//     element.innerHTML = addresses.filter(it => it.billingAddress === true)[0].name
//   })
// }
// _billingAddressName()

// function _billingAddressStreet() {
//   const elements = document.querySelectorAll("div[class*='kundenstrasseinput2']")

//   if (elements.length === 0) return

//   if (!window.localStorage.getItem("addresses")) {
//     _noAddressFound()
//     return
//   }

//   const addresses = JSON.parse(window.localStorage.getItem("addresses"))
//   elements.forEach(element => {
//     element.innerHTML = addresses.filter(it => it.billingAddress === true)[0].street
//   })
// }
// _billingAddressStreet()

// function _billingAddressZip() {
//   const elements = document.querySelectorAll("div[class*='kundenplzinput2']")

//   if (elements.length === 0) return

//   if (!window.localStorage.getItem("addresses")) {
//     _noAddressFound()
//     return
//   }

//   const addresses = JSON.parse(window.localStorage.getItem("addresses"))
//   elements.forEach(element => {
//     element.innerHTML = addresses.filter(it => it.billingAddress === true)[0].zip
//   })
// }
// _billingAddressZip()

// function _billingAddressEmail() {
//   const elements = document.querySelectorAll("div[class*='kundenemailinput2']")

//   if (elements.length === 0) return

//   if (!window.localStorage.getItem("addresses")) {
//     _noAddressFound()
//     return
//   }

//   const addresses = JSON.parse(window.localStorage.getItem("addresses"))
//   elements.forEach(element => {
//     element.innerHTML = addresses.filter(it => it.billingAddress === true)[0].email
//   })
// }
// _billingAddressEmail()

async function _renderTotalHbarAmount() {
  const divs = document.querySelectorAll("div[class*='hbar-gesamtkosten-rechner']")

  if (divs.length === 0) return

  const cart = await _getCart()

  if (cart.length === 0) {
    _noCartItemFound()
    return
  }

  const cartPrice = parseFloat(cart[0].price.replace(",", "."))
  const priceInHbar = await getPriceInHbar(cartPrice)

  divs.forEach(div => div.innerHTML = `${priceInHbar.toFixed(8)} ℏ`)
}
_renderTotalHbarAmount()

function _inputDefaultStyle(htmlInputElement) {
  htmlInputElement.setAttribute("style", `
    border: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding-left: 20px;
  `)
}

function _inputIsValidStyle(htmlInputElement) {
  htmlInputElement.setAttribute("style", `
    border-radius: 15px;
    border-color: green;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding-left: 20px;
  `)
}

function _inputIsNotValidStyle(htmlInputElement) {
  htmlInputElement.setAttribute("style", `
    border-radius: 15px;
    border-color: red;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding-left: 20px;
  `)
}

export function _inputIsEmpty(htmlInputElement) {
  if (htmlInputElement.validity.valueMissing) {
    _inputIsNotValidStyle(htmlInputElement)
    htmlInputElement.setAttribute("title", "Dieses Feld ist notwendig.")
  }
}

function _inputIsValid(htmlInputElement) {
  if (htmlInputElement.checkValidity()) {
    _inputIsValidStyle(htmlInputElement)
    htmlInputElement.setAttribute("title", "✅")
  }
}

function _renderAccountIdInputField() {
  const fields = document.querySelectorAll("div[class*='hedera-account-id-input']")

  if (fields.length === 0) return

  fields.forEach(field => {
    const input = document.createElement("input")

    input.setAttribute("type", "text")
    input.setAttribute("name", "accountId")
    input.setAttribute("pattern", "\\d.\\d.\\d{4,}")
    input.setAttribute("required", "true")
    input.setAttribute("title", "Geben Sie hier Ihre Hedera Account Id an.")

    _inputDefaultStyle(input)

    input.addEventListener("keyup", (event) => {
      _inputIsEmpty(event.target)
      if (input.validity.patternMismatch) {
        _inputIsNotValidStyle(input)
        input.setAttribute("title", "Hedera Account Ids haben die Form: 0.0.1234xx")
      }
      _inputIsValid(event.target)
    })

    field.appendChild(input)
  })
  return inputFields
}
// _renderAccountIdInputField()

function _nameInputField() {
  const inputFields = document.querySelectorAll("div[class*='name-input']")

  if (inputFields.length === 0) return

  inputFields.forEach(field => {
    const input = document.createElement("input")

    input.setAttribute("type", "text")
    input.setAttribute("name", "name")
    input.setAttribute("required", "true")
    input.setAttribute("title", "Bitte geben Sie hier Ihren vollständigen Namen ein.")

    _inputDefaultStyle(input)

    input.addEventListener("keyup", (event) => {
      _inputIsEmpty(event.target)
      _inputIsValid(event.target)
    })

    field.appendChild(input)
  })
  return inputFields
}
// _nameInputField()

function _streetInputField() {
  const inputFields = document.querySelectorAll("div[class*='strasse-input']")

  if (inputFields.length === 0) return

  inputFields.forEach(field => {
    const input = document.createElement("input")

    input.setAttribute("type", "text")
    input.setAttribute("name", "street")
    input.setAttribute("required", "true")
    input.setAttribute("title", "Bitte geben Sie Ihre Straße und Hausnummer an, wie zum Beispiel: Hauptstr. 4")

    _inputDefaultStyle(input)

    input.addEventListener("keyup", (event) => {
      _inputIsEmpty(event.target)
      _inputIsValid(event.target)
    })

    field.appendChild(input)
  })
  return inputFields
}
// _streetInputField()

function _zipInputField() {
  const inputFields = document.querySelectorAll("div[class*='plz-input']")

  if (inputFields.length === 0) return

  inputFields.forEach(field => {
    const input = document.createElement("input")

    input.setAttribute("type", "text")
    input.setAttribute("name", "zip")
    input.setAttribute("required", "true")
    input.setAttribute("title", "Bitte geben Sie die Postleitzahl und Ortschaft an.")

    _inputDefaultStyle(input)

    input.addEventListener("keyup", (event) => {
      _inputIsEmpty(event.target)
      _inputIsValid(event.target)
    })

    field.appendChild(input)
  })
  return inputFields
}
// _zipInputField()

function _emailInputField() {
  const inputFields = document.querySelectorAll("div[class*='email-input']")

  if (inputFields.length === 0) return

  inputFields.forEach(field => {
    const input = document.createElement("input")

    input.setAttribute("type", "email")
    input.setAttribute("name", "email")
    input.setAttribute("required", "true")
    input.setAttribute("title", "Bitte geben Sie Ihre E-Mail Adresse an.")

    _inputDefaultStyle(input)

    input.addEventListener("keyup", (event) => {
      _inputIsEmpty(event.target)
      if (input.validity.patternMismatch) {
        _inputIsNotValidStyle(input)
        input.setAttribute("title", "E-Mails haben die Form: stefanie.mueller@web.de")
      }
      _inputIsValid(event.target)
    })

    field.appendChild(input)
  })
  return inputFields

}
// _emailInputField()

function _privateKeyInputField() {
  const inputFields = document.querySelectorAll("div[class*='private-key-input']")

  if (inputFields.length === 0) return

  inputFields.forEach(field => {
    const input = document.createElement("input")

    input.setAttribute("type", "password")
    input.setAttribute("name", "privateKey")
    input.setAttribute("required", "true")
    input.setAttribute("title", "Bitte geben Sie Ihren Hedera Private Key an.")

    _inputDefaultStyle(input)

    input.addEventListener("keyup", (event) => {
      _inputIsEmpty(event.target)
      _inputIsValid(event.target)
    })

    field.appendChild(input)
  })
  return inputFields

}
// _privateKeyInputField()

function _securityKeyInputField() {
  const inputFields = document.querySelectorAll("div[class*='sicherheitsschlssel-input']")

  if (inputFields.length === 0) return

  inputFields.forEach(field => {
    const input = document.createElement("input")

    input.setAttribute("type", "password")
    input.setAttribute("name", "securityKey")
    input.setAttribute("required", "true")
    input.setAttribute("title", "Bitte geben Sie Ihren Sicherheitsschlüssen an.")

    _inputDefaultStyle(input)

    input.addEventListener("keyup", (event) => {
      _inputIsEmpty(event.target)
      _inputIsValid(event.target)
    })

    field.appendChild(input)
  })
  return inputFields

}
// _securityKeyInputField()

export function _openNameInputField(cssSelector) {
  return new Promise((resolve, reject) => {
    const elements = document.querySelectorAll(cssSelector)

    if (elements.length === 0) return

    let name
    elements.forEach(element => {
      element.innerHTML = ""

      const input = document.createElement("input")
      input.setAttribute("type", "text")
      input.setAttribute("name", "name")
      input.setAttribute("required", "true")
      input.setAttribute("title", "Bitte geben Sie hier Ihren vollständigen Namen ein.")

      input.setAttribute("style", `
        border-width: 1px;
        border-color: grey;
        border-radius: 5px;
        background-color: transparent;
      `)

      input.addEventListener("keypress", (event) => {
        // console.log(event);
        if (input.validity.valueMissing) {
          input.setAttribute("style", `
            border-color: red;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Dieses Feld ist notwendig")
        }
        if (input.checkValidity()) {
          input.setAttribute("style", `
            border-color: green;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Bestätigen Sie mit Enter")
        }

        if (event.key === "Enter") {
          if (!input.checkValidity()) {
            // _updateAddressName(cssSelector)
            // _updateAddressStreet(cssSelector)
            // _updateAddressZip(cssSelector)
            // _updateAddressEmail(cssSelector)
            _updateAllAddressFields()
            return
          }
          name = input.value
          element.innerHTML = name
          resolve(name)
        }
      })
      element.append(input)
      input.focus()
      input.select()
    })
  })

}

export function _openStreetInputField(cssSelector) {
  return new Promise((resolve, reject) => {
    const elements = document.querySelectorAll(cssSelector)

    if (elements.length === 0) return

    let street
    elements.forEach(element => {
      element.innerHTML = ""

      const input = document.createElement("input")
      input.setAttribute("type", "text")
      input.setAttribute("name", "street")
      input.setAttribute("required", "true")
      input.setAttribute("title", "Bitte geben Sie Ihre Straße und Hausnummer ein.")

      input.setAttribute("style", `
        border-width: 1px;
        border-color: grey;
        border-radius: 5px;
        background-color: transparent;
      `)

      input.addEventListener("keypress", (event) => {
        if (input.validity.valueMissing) {
          input.setAttribute("style", `
            border-color: red;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Dieses Feld ist notwendig")
        }
        if (input.checkValidity()) {
          input.setAttribute("style", `
            border-color: green;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Bestätigen Sie mit Enter")
        }

        if (event.key === "Enter") {
          if (!input.checkValidity()) {
            // _updateAddressName(cssSelector)
            // _updateAddressStreet(cssSelector)
            // _updateAddressZip(cssSelector)
            // _updateAddressEmail(cssSelector)
            _updateAllAddressFields()
            return
          }
          street = input.value
          element.innerHTML = street
          resolve(street)
        }
      })
      element.append(input)
      input.focus()
      input.select()
    })
  })
}

export function _openZipInputField(cssSelector) {
  return new Promise((resolve, reject) => {
    const elements = document.querySelectorAll(cssSelector)

    if (elements.length === 0) return

    let zip
    elements.forEach(element => {
      element.innerHTML = ""

      const input = document.createElement("input")
      input.setAttribute("type", "text")
      input.setAttribute("name", "zip")
      input.setAttribute("required", "true")
      input.setAttribute("title", "Bitte geben Sie Ihre Postleitzahl und den Ort ein.")

      input.setAttribute("style", `
        border-width: 1px;
        border-color: grey;
        border-radius: 5px;
        background-color: transparent;
      `)

      input.addEventListener("keypress", (event) => {
        if (input.validity.valueMissing) {
          input.setAttribute("style", `
            border-color: red;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Dieses Feld ist notwendig")
        }
        if (input.checkValidity()) {
          input.setAttribute("style", `
            border-color: green;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Bestätigen Sie mit Enter")
        }

        if (event.key === "Enter") {
          if (!input.checkValidity()) {
            // _updateAddressName(cssSelector)
            // _updateAddressStreet(cssSelector)
            // _updateAddressZip(cssSelector)
            // _updateAddressEmail(cssSelector)
            _updateAllAddressFields()
            return
          }
          zip = input.value
          element.innerHTML = zip
          resolve(zip)
        }
      })
      element.append(input)
      input.focus()
      input.select()
    })
  })
}

export function _openEmailInputField(cssSelector) {
  return new Promise((resolve, reject) => {
    const elements = document.querySelectorAll(cssSelector)

    if (elements.length === 0) return

    let email
    elements.forEach(element => {
      element.innerHTML = ""

      const input = document.createElement("input")
      input.setAttribute("type", "email")
      input.setAttribute("name", "email")
      input.setAttribute("required", "true")
      input.setAttribute("title", "Bitte geben Sie Ihre E-Mail Adresse ein.")

      input.setAttribute("style", `
        border-width: 1px;
        border-color: grey;
        border-radius: 5px;
        background-color: transparent;
      `)

      input.addEventListener("keypress", (event) => {
        if (input.validity.valueMissing) {
          input.setAttribute("style", `
            border-color: red;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Dieses Feld ist notwendig")
        }
        if (input.checkValidity()) {
          input.setAttribute("style", `
            border-color: green;
            border-radius: 5px;
            background-color: transparent;
          `)
          input.setAttribute("title", "Bestätigen Sie mit Enter")
        }

        if (event.key === "Enter") {
          if (!input.checkValidity()) {
            // _updateAddressName(cssSelector)
            // _updateAddressStreet(cssSelector)
            // _updateAddressZip(cssSelector)
            // _updateAddressEmail(cssSelector)
            _updateAllAddressFields()
            return
          }
          email = input.value
          element.innerHTML = email
          resolve(email)
        }
      })
      element.append(input)
      input.focus()
      input.select()
    })
  })
}

function _updateAllAddressFields() {
  const shippingNameFields = document.querySelectorAll("div[class*='kundennameinput1']")
  const billingNameFields = document.querySelectorAll("div[class*='kundennameinput2']")
  const shippingStreetFields = document.querySelectorAll("div[class*='kundenstrasseinput1']")
  const billingStreetFields = document.querySelectorAll("div[class*='kundenstrasseinput2']")
  const shippingZipFields = document.querySelectorAll("div[class*='kundenplzinput1']")
  const billingZipFields = document.querySelectorAll("div[class*='kundenplzinput2']")
  const shippingEmailFields = document.querySelectorAll("div[class*='kundenemailinput1']")
  const billingEmailFields = document.querySelectorAll("div[class*='kundenemailinput2']")

  if (shippingNameFields.length === 0) return
  if (billingNameFields.length === 0) return
  if (shippingStreetFields.length === 0) return
  if (billingStreetFields.length === 0) return
  if (shippingZipFields.length === 0) return
  if (billingZipFields.length === 0) return
  if (shippingEmailFields.length === 0) return
  if (billingEmailFields.length === 0) return

  if (!window.localStorage.getItem("addresses")) {
    _noAddressFound()
    return
  }

  const addresses = JSON.parse(window.localStorage.getItem("addresses"))

  shippingNameFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.shippingAddress === true)[0].name
  })

  billingNameFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.billingAddress === true)[0].name
  })

  shippingStreetFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.shippingAddress === true)[0].street
  })

  billingStreetFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.billingAddress === true)[0].street
  })

  shippingZipFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.shippingAddress === true)[0].zip
  })

  billingZipFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.billingAddress === true)[0].zip
  })

  shippingEmailFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.shippingAddress === true)[0].email
  })

  billingEmailFields.forEach(field => {
    field.innerHTML = addresses.filter(it => it.billingAddress === true)[0].email
  })
}
// _updateAllAddressFields()

export function _renderNotAvailableNfts() {
  const nfts = JSON.parse(window.sessionStorage.getItem("nfts")) // null exception
  console.log(nfts);

  const notAvailableNfts = nfts.filter(it => it.treasuryId !== it.owner)
  console.log(notAvailableNfts);
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
