import { getPriceInHbar } from "./fetch.js"
import {
  _noUserSessionFound,
  _noAccountIdFound,
  _noCartItemFound,
  _noUserFound,
  _noAddressFound,
} from "./exceptions.js"

export function _updateCartPointer() {
  const cartPointerTopRight = document.querySelectorAll("div[class*='anzahl-warenkorb']")

  if (cartPointerTopRight.length === 0) return

  const cart = JSON.parse(localStorage.getItem("cart")) || []
  cartPointerTopRight.forEach(pointer => pointer.innerHTML = `${cart.length}`)
}

export function _removeItemFromCart() {
  // localStorage.clear()

  document.querySelectorAll("div[class*='kleidchenbezeichnung']").forEach(element => element.remove())
  document.querySelectorAll("img[class*='vorderseitebild']").forEach(element => element.remove())
  document.querySelectorAll("div[class*='lschen']").forEach(element => element.remove())
  document.querySelectorAll("div[class*='preis1']").forEach(element => element.remove())
  document.querySelectorAll("div[class*='versand-5-7']").forEach(element => element.remove())

  _updateCartPointer()
}

// function _cartList() {
//   if (!window.localStorage.getItem("cart")) {
//     _removeItemFromCart()
//     return
//   }
// }
// _cartList()

function _productName() {
  const nameElements = document.querySelectorAll("div[class*='kleidchenbezeichnung']")
  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  if (nameElements.length === 0) return

  if (window.__DATA__) {
    nameElements.forEach(element => element.innerHTML = `${window.__DATA__.name}`)
    return
  }

  if (!window.localStorage.getItem("cart")) {
    nameElements.forEach(element => element.remove())
    return
  }
  nameElements.forEach(element => element.innerHTML = cart[0].name)
}
_productName()

function _productPrice() {
  const priceElements = document.querySelectorAll("div[class*='preis1']")
  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  if (priceElements.length === 0) return

  if (window.__DATA__) {
    priceElements.forEach(element => element.innerHTML = `${window.__DATA__.price} €`)
    return
  }

  if (!window.localStorage.getItem("cart")) {
    priceElements.forEach(element => element.remove())
  } else {
    priceElements.forEach(element => element.innerHTML = `${cart[0].price} EUR`)
  }
}
_productPrice()

function _productDescription() {
  const infoTextElements = document.querySelectorAll("div[class*='infotext']")
  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  if (infoTextElements.length === 0) return

  if (window.__DATA__) {
    infoTextElements.forEach(element => element.innerHTML = `${window.__DATA__.name} <br />${window.__DATA__.description}`)
    return
  }

  if (!window.localStorage.getItem("cart")) {
    infoTextElements.forEach(element => element.remove())
    return
  }

  infoTextElements.forEach(element => element.innerHTML = `${cart[0].name} <br />${cart[0].description}`)
}
_productDescription()

function _productCompatibility() {
  const compatibilityElements = document.querySelectorAll("div[class*='vertraeglichkeit1']")
  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  if (compatibilityElements.length === 0) return

  if (window.__DATA__) {
    compatibilityElements.forEach(element => element.innerHTML = window.__DATA__.attributes.compatibility.join(" & "))
    return
  }

  if (!window.localStorage.getItem("cart")) {
    compatibilityElements.forEach(element => element.remove())
    return
  }

  compatibilityElements.forEach(element => element.innerHTML = cart[0].attributes.compatibility.join(" & "))
}
_productCompatibility()

function _productSize() {
  const sizeElements = document.querySelectorAll("div[class*='groesse1']")
  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  if (sizeElements.length === 0) return

  if (window.__DATA__) {
    sizeElements.forEach(element => element.innerHTML = `${window.__DATA__.attributes.size}`)
    return
  }

  if (!window.localStorage.getItem("cart")) {
    sizeElements.forEach(element => element.remove())
    return
  }

  sizeElements.forEach(element => element.innerHTML = `${cart[0].attributes.size}`)
}
_productSize()

function _productMaterial() {
  const materialElements = document.querySelectorAll("div[class*='stoff1']")
  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  if (materialElements.length === 0) return

  if (window.__DATA__) {
    materialElements.forEach(element => element.innerHTML = `${window.__DATA__.attributes.material.join(", ")}`)
    return
  }

  if (!window.localStorage.getItem("cart")) {
    materialElements.forEach(element => element.remove())
    return
  }
  materialElements.forEach(element => element.innerHTML = `${cart[0].attributes.material.join(", ")}`)
}
_productMaterial()

function _productPattern() {
  const patternElements = document.querySelectorAll("div[class*='muster1']")
  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  if (patternElements.length === 0) return

  if (window.__DATA__) {
    patternElements.forEach(element => element.innerHTML = `${window.__DATA__.attributes.pattern}`)
    return
  }

  if (!window.localStorage.getItem("cart")) {
    patternElements.forEach(element => element.remove())
    return
  }
  patternElements.forEach(element => element.innerHTML = `${cart[0].attributes.pattern}`)

}
_productPattern()

export function _productDetailLinks() {
  const productDetailLinks = document.querySelectorAll("a[href*='produktansichtdetail1']")

  if (productDetailLinks.length === 0) return

  if (window.__DATA__) {
    productDetailLinks.forEach(link => link.setAttribute("href", `${window.__DATA__.links.detail}`))
    return
  }
}
// _productDetailLinks()

export function _productLinks() {
  const productLinks = document.querySelectorAll("a[href*='produktansicht1']")

  if (productLinks.length === 0) return

  if (window.__DATA__) {
    productLinks.forEach(link => link.setAttribute("href", `${window.__DATA__.links.overview}`))
    return
  }
}
// _productLinks()

function _productFrontImage() {
  const frontImages = document.querySelectorAll("img[class*='vorderseitebild']")
  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  if (frontImages.length === 0) return

  if (window.__DATA__) {
    frontImages.forEach(image => {
      image.setAttribute("style", "object-fit: contain;")
      image.setAttribute("src", `${window.__DATA__.images.front}`)
    })
    return
  }

  if (!window.localStorage.getItem("cart")) {
    frontImages.forEach(image => image.remove())
    return
  }
  frontImages.forEach(image => {
    image.setAttribute("style", "object-fit: contain;")
    image.setAttribute("src", `${cart[0].images.front}`)
  })
}
_productFrontImage()

function _productBackImage() {
  const backImages = document.querySelectorAll("img[class*='rckseitebild']")
  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  if (backImages.length === 0) return

  if (window.__DATA__) {
    backImages.forEach(image => {
      image.setAttribute("style", "object-fit: contain;")
      image.setAttribute("src", `${window.__DATA__.images.back}`)
    })
    return
  }

  if (!window.localStorage.getItem("cart")) {
    backImages.forEach(image => image.remove())
    return
  }
  backImages.forEach(image => {
    image.setAttribute("style", "object-fit: contain;")
    image.setAttribute("src", `${cart[0].images.back}`)
  })
}
_productBackImage()

function _productDetailImage() {
  const detailImages = document.querySelectorAll("img[class*='detailaufnahme']")
  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  if (detailImages.length === 0) return

  if (window.__DATA__) {
    detailImages.forEach(image => {
      image.setAttribute("style", "opacity: 0.3 !important;")
      image.setAttribute("src", `${window.__DATA__.images.detail}`)
    })
    return
  }

  if (!window.localStorage.getItem("cart")) {
    detailImages.forEach(image => image.remove())
    return
  }

  detailImages.forEach(image => {
    image.setAttribute("style", "opacity: 0.3 !important;")
    image.setAttribute("src", `${cart[0].images.detail}`)
  })
}
_productDetailImage()

function _productTotalPrice() {
  const totalPriceElements = document.querySelectorAll("div[class*='gesamtpreis1']")
  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  if (totalPriceElements.length === 0) return

  if (!window.localStorage.getItem("cart")) {
    totalPriceElements.forEach(element => element.remove())
    return
  }
  totalPriceElements.forEach(element => element.innerHTML = `${_getTotalPrice()} EUR`)
}
_productTotalPrice()

function _getTotalPrice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  const total = cart
    .map(item => parseFloat(item.price.replace(",", ".")))
    .reduce((prev, curr) => prev + curr, 0)

  return total.toFixed(2)
}

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
_accountId()

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

async function _updateTotalHbarAmount() {
  const elements = document.querySelectorAll("div[class*='hbar-gesamtkosten-rechner']")

  if (elements.length === 0) return

  // var lastHbarPrice
  // elements.forEach(element => {
  //   lastHbarPrice = element.innerHTML
  // })
  // // console.log(lastHbarPrice.trim().split(" "))
  // console.log(parseFloat(lastHbarPrice.trim().split(" ")[0].replace(".", "").replace(",", ".")))

  // const response = await fetch("http://localhost:8888/.netlify/functions/hbar-exchange-rate", {
  //   mode: "same-origin"
  // })
  // const body = await response.text()
  // const data = JSON.parse(body)

  // const USD_EUR = parseFloat(data.USD_EUR)
  // const HBAR_USD = parseFloat(data.HBAR_USD)

  const cart = JSON.parse(window.localStorage.getItem("cart")) || []

  if (cart.length === 0) {
    _noCartItemFound()
    return
  }

  const cartPrice = parseFloat(cart[0].price.replace(",", "."))
  // const priceInDollar = cartPrice / USD_EUR
  // const priceInHbar = priceInDollar / HBAR_USD

  const priceInHbar = await getPriceInHbar(cartPrice)

  elements.forEach(element => element.innerHTML = `${priceInHbar.toFixed(8)} ℏ`)

  // var lastHbarPrice
  // elements.forEach(element => {
  //   lastHbarPrice = element.innerHTML
  // })
  // console.log(lastHbarPrice.trim().split(" "))
  // console.log(parseFloat(lastHbarPrice.trim().split(" ")[0]))

  // return priceInHbar
}
// _totalHbarAmount()
_updateTotalHbarAmount()

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

function _accountIdInputField() {
  const inputFields = document.querySelectorAll("div[class*='hedera-account-id-input']")

  if (inputFields.length === 0) return

  inputFields.forEach(field => {
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
_accountIdInputField()

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
_nameInputField()

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
_streetInputField()

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
_zipInputField()

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
_emailInputField()

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
_privateKeyInputField()

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
_securityKeyInputField()

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
_updateAllAddressFields()

export function _renderNotAvailableNfts() {
  const nfts = JSON.parse(window.sessionStorage.getItem("nfts"))
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
