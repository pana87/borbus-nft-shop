import {
  _updateCartPointer,
  _removeItemFromCart,
  _inputIsEmpty,
  _openNameInputField,
  _openStreetInputField,
  _openZipInputField,
  _openEmailInputField
} from "./render.js"
import { _noAddressFound, _noCartItemFound, _noUserFound, _noUserSessionFound } from "./exceptions.js"
import { getPriceInHbar } from "./fetch.js"
import { _getCart } from "./storage.js"

function _onLoginButtonClick() {
  const loginButtons = document.querySelectorAll("div[class*='login1']")

  if (loginButtons.length === 0) return

  loginButtons.forEach(button => {
    button.setAttribute("style", "cursor: pointer;")
    button.addEventListener("click", async () => {
      const accountIdFields = document.querySelectorAll("input[name='accountId']")
      if (accountIdFields.length === 0) return
      let accountId
      accountIdFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        accountId = field.value
      })
      if (accountId === undefined) return

      const privateKeyFields = document.querySelectorAll("input[name='privateKey']")
      if (privateKeyFields.length === 0) return
      let privateKey
      privateKeyFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        privateKey = field.value
      })
      if (privateKey === undefined) return

      const securityKeyFields = document.querySelectorAll("input[name='securityKey']")
      if (securityKeyFields.length === 0) return
      let securityKey
      securityKeyFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        securityKey = field.value
      })
      if (securityKey === undefined) return

      // import key
      const dataAsBytes = new TextEncoder().encode(privateKey)
      const keyAsBytes = new TextEncoder().encode(securityKey)

      const passwordKey = await window.crypto.subtle.importKey(
        "raw",
        keyAsBytes,
        "PBKDF2",
        false,
        ["deriveKey"]
      )

      // derive key
      const salt = window.crypto.getRandomValues(new Uint8Array(32))
      const aesKey = await window.crypto.subtle.deriveKey({
        name: "PBKDF2",
        hash: { name: "SHA-256" },
        salt,
        iterations: 250000
      }, passwordKey, { name: "AES-GCM", length: 256 }, false, ["encrypt"])

      // encrypt data
      const iv = window.crypto.getRandomValues(new Uint8Array(12))
      const encryptedData = await window.crypto.subtle.encrypt({
        name: "AES-GCM",
        iv,
      }, aesKey, dataAsBytes)
      const encryptedBytes = new Uint8Array(encryptedData)
      const encryptedPackage = [...salt, ...iv, ...encryptedBytes]

      window.sessionStorage.setItem("userSession", JSON.stringify({
        accountId,
        data: encryptedPackage
      }))

      if (document.referrer.endsWith("/warenkorb/")) {
        window.location.assign("/bestellubersicht")
        return
      }
      window.location.assign("/accountuebersicht")

    })
  })
}
_onLoginButtonClick()

function _onLoginLinkButtonClick() {
  const loginLinks = document.querySelectorAll("div[class*='login2']")

  if (loginLinks.length === 0) return

  loginLinks.forEach(link => {
    link.setAttribute("style", "cursor: pointer;")
    link.addEventListener("click", () => {
      if (!window.localStorage.getItem("userSession")) {
        alert("Es wurden keine lokalen Daten gefunden. Bitte registrieren Sie sich erneut.")
        return
      }
      if (!window)
      window.location.assign("/loginbereich")
      return
    })
  })
}
_onLoginLinkButtonClick()

function _onOrderButtonClick() {
  const orderButtons = document.querySelectorAll("div[class*='bestellen1']")

  if (orderButtons.length === 0) return

  orderButtons.forEach(button => {
    button.setAttribute("style", "cursor: pointer;")
    button.addEventListener("click", async () => {

      if (!window.localStorage.getItem("cart")) {
        _noCartItemFound()
        return
      }

      if (!window.sessionStorage.getItem("userSession")) {
        _noUserSessionFound()
        return
      }

      if (!window.localStorage.getItem("addresses")) {
        _noAddressFound()
        return
      }

      const securityKey = prompt("Bitte geben Sie Ihren Sicherheitsschlüssel ein")
      if (securityKey === null || securityKey.length === 0) return

      const securityKeyAsBytes = new TextEncoder().encode(securityKey)
      const session = new Uint8Array(JSON.parse(window.sessionStorage.getItem("userSession")).data)
      const accountId = JSON.parse(window.sessionStorage.getItem("userSession")).accountId
      const cartItem = JSON.parse(window.localStorage.getItem("cart"))[0]
      const addresses = JSON.parse(window.localStorage.getItem("addresses"))
      const shippingAddress = addresses.filter(it => it.shippingAddress === true)[0]
      const billingAddress = addresses.filter(it => it.billingAddress === true)[0]
      const hbarTotalElements = document.querySelectorAll("div[class*='hbar-gesamtkosten-rechner']")

      let renderedHbarPrice
      hbarTotalElements.forEach(element => {
        renderedHbarPrice = element.innerHTML
      })

      const previousHbarPrice = parseFloat(renderedHbarPrice.trim().split(" ")[0])
      const cart = JSON.parse(window.localStorage.getItem("cart")) || []

      if (cart.length === 0) {
        _noCartItemFound()
        return
      }

      const itemPrice = parseFloat(cart[0].price.replace(",", "."))
      const currentHbarPrice = await getPriceInHbar(itemPrice)
      const priceInTinybars = currentHbarPrice.toFixed(8).replace(".", "")

      if (previousHbarPrice !== parseFloat(currentHbarPrice.toFixed(8))) {
        alert("Der Hbar Preis wurde aktualisiert")
        hbarTotalElements.forEach(element => element.innerHTML = `${currentHbarPrice.toFixed(8)} ℏ`)
        return
      }

      const xhr = new XMLHttpRequest()
      xhr.open("POST", "/.netlify/functions/treasury-to-user-transaction")
      xhr.setRequestHeader("Content-Type", "application/json")
      xhr.overrideMimeType("text/html")

      xhr.onload = () => {
        if (xhr.status === 200) {
          window.location.assign("/danke")
        } else {
          window.location.assign("/fehlgeschlagen")
        }
      }

      xhr.send(JSON.stringify({
        accountId,
        session,
        securityKeyAsBytes,
        cartItem,
        shippingAddress,
        billingAddress,
        priceInTinybars,
      }))
    })
  })
}
_onOrderButtonClick()

function _onPayButtonClick() {
  const payButtons = document.querySelectorAll("div[class*='bezahlen1']")

  if (payButtons.length === 0) return

  payButtons.forEach(button => {
    button.setAttribute("style", "cursor: pointer;")

    button.addEventListener("click", () => {

      if (!localStorage.getItem("cart")) {
        _noCartItemFound()
        return
      }

      if (!sessionStorage.getItem("userSession")) {
        _noUserSessionFound()
        return
      }

      if (!window.localStorage.getItem("addresses")) {
        _noAddressFound()
        return
      }

      window.location.assign("/bestellubersicht")
    })
  })
}
_onPayButtonClick()

function _onCartButtonClick() {
  const cartButtonsCenter = document.querySelectorAll("div[class*='warenkorb-button-mitte']")

  if (cartButtonsCenter.length === 0) return

  cartButtonsCenter.forEach(button => button.addEventListener("click", () => {
    let cart = []
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }

    cart = JSON.parse(localStorage.getItem("cart")) || []

    if (!window.sessionStorage.getItem("nfts")) {
      alert("Es wird noch die Verfügbarkeit geprüft. Bitte versuchen Sie es in ein paar Sekunden erneut")
      return
    }
    const nfts = JSON.parse(window.sessionStorage.getItem("nfts"))
    const notAvailableNfts = nfts.filter(it => it.treasuryId !== it.owner)
    if (notAvailableNfts.some(item => item.serial === window.__DATA__.id)) {
      alert("Dieses Kleidchen ist bereits verkauft")
      return
    }

    const cartContainsDressId = cart.some(item => item.id === window.__DATA__.id)
    if (cartContainsDressId) {
      alert(`${window.__DATA__.name} ist bereits im Warenkorb`)
      return
    }


    cart = []
    cart.push(window.__DATA__)
    localStorage.setItem("cart", JSON.stringify(cart))
    alert(`${window.__DATA__.name} wurde erfolgreich in den Warenkorb gelegt`)

    _updateCartPointer()
  }))
}
if (window.__DATA__) {
  _onCartButtonClick()
}

function _onDeleteCartButtonClick() {
  const deleteButtons = document.querySelectorAll("div[class*='lschen']")

  if (deleteButtons.length === 0) return

  deleteButtons.forEach(element => {
    element.setAttribute("style", "cursor: pointer;")
    element.addEventListener("click", () => {
      window.localStorage.removeItem("cart")
      _removeItemFromCart()
    })
  })

}
_onDeleteCartButtonClick()

function _onCartButtonTopRightClick() {
  const cartButtons = document.querySelectorAll("div[class*='warenkorb-oben-rechts']")

  if (cartButtons.length === 0) return

  cartButtons.forEach(button => {
    button.setAttribute("style", "cursor: pointer;")
    button.addEventListener("click", async () => {

      const cart = await _getCart()

      if (cart.length === 0) {
        alert("Es befindet sich kein Kleidchen im Warenkorb")
        window.location.assign("/shop")
        return
      }
      window.location.assign("/warenkorb")
    })
  })
}
_onCartButtonTopRightClick()

function _onRegisterButtonClick() {
  const registerButtons = document.querySelectorAll("div[class*='registrieren1']")

  if (registerButtons.length === 0) return

  registerButtons.forEach(button => {
    button.setAttribute("style", "cursor: pointer;")

    button.addEventListener("click", async () => {

      const accountIdFields = document.querySelectorAll("input[name='accountId']")
      if (accountIdFields.length === 0) return
      let accountId
      accountIdFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        accountId = field.value
      })
      if (accountId === undefined) return

      const privateKeyFields = document.querySelectorAll("input[name='privateKey']")
      if(privateKeyFields.length === 0) return
      let privateKey
      privateKeyFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        privateKey = field.value
      })
      if (privateKey === undefined) return

      const securityKeyFields = document.querySelectorAll("input[name='securityKey']")
      if(securityKeyFields.length === 0) return
      let securityKey
      securityKeyFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        securityKey = field.value
      })
      if (securityKey === undefined) return

      const nameFields = document.querySelectorAll("input[name='name']")
      if (nameFields.length === 0) return
      let name
      nameFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        name = field.value
      })
      if (name === undefined) return

      const streetFields = document.querySelectorAll("input[name='street']")
      if (streetFields.length === 0) return
      let street
      streetFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        street = field.value
      })
      if (street === undefined) return

      const zipFields = document.querySelectorAll("input[name='zip']")
      if (zipFields.length === 0) return
      let zip
      zipFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        zip = field.value
      })
      if (zip === undefined) return

      const emailFields = document.querySelectorAll("input[name='email']")
      if (emailFields.length === 0) return
      let email
      emailFields.forEach(field => {
        _inputIsEmpty(field)
        if (!field.checkValidity()) return
        email = field.value
      })
      if (email === undefined) return

      // store addresses
      const addresses = JSON.parse(window.localStorage.getItem("addresses")) || []
      if (addresses.length === 0) {
        addresses.push({
          name,
          street,
          zip,
          email,
          shippingAddress: true,
          billingAddress: true,
        })
      } else {
        addresses.push({
          name,
          street,
          zip,
          email,
          shippingAddress: false,
          billingAddress: false,
        })
      }
      window.localStorage.setItem("addresses", JSON.stringify(addresses))

      // import key
      const dataAsBytes = new TextEncoder().encode(privateKey)
      const keyAsBytes = new TextEncoder().encode(securityKey)

      const passwordKey = await window.crypto.subtle.importKey(
        "raw",
        keyAsBytes,
        "PBKDF2",
        false,
        ["deriveKey"]
      )

      // derive key
      const salt = window.crypto.getRandomValues(new Uint8Array(32))
      const aesKey = await window.crypto.subtle.deriveKey({
        name: "PBKDF2",
        hash: { name: "SHA-256" },
        salt,
        iterations: 250000
      }, passwordKey, { name: "AES-GCM", length: 256 }, false, ["encrypt"])

      // encrypt data
      const iv = window.crypto.getRandomValues(new Uint8Array(12))
      const encryptedData = await window.crypto.subtle.encrypt({
        name: "AES-GCM",
        iv,
      }, aesKey, dataAsBytes)
      const encryptedBytes = new Uint8Array(encryptedData)
      const encryptedPackage = [...salt, ...iv, ...encryptedBytes]

      window.sessionStorage.setItem("userSession", JSON.stringify({
        accountId,
        data: encryptedPackage,
      }))

      if (document.referrer.endsWith("/warenkorb/")) {
        window.location.assign("/bestellubersicht")
        return
      }
      window.location.assign("/accountuebersicht")

    })
  })
}
_onRegisterButtonClick()

function _onChangeShippingAddressButtonClick() {
  const elements = document.querySelectorAll("div[class*='ndern1']")

  if (elements.length === 0) return

  elements.forEach(element => {
    element.setAttribute("style", "cursor: pointer;")
    element.addEventListener("click", async () => {
      const name = await _openNameInputField("div[class*='kundennameinput1']")
      const street = await _openStreetInputField("div[class*='kundenstrasseinput1']")
      const zip = await _openZipInputField("div[class*='kundenplzinput1']")
      const email = await _openEmailInputField("div[class*='kundenemailinput1']")

      if (!window.localStorage.getItem("addresses")) {
        _noAddressFound()
        return
      }

      const addresses = JSON.parse(window.localStorage.getItem("addresses"))

      addresses.forEach(address => address.shippingAddress = false)
      addresses.push({
        name,
        street,
        zip,
        email,
        shippingAddress: true,
        billingAddress: false
      })
      window.localStorage.setItem("addresses", JSON.stringify(addresses))
    })
  })
}
_onChangeShippingAddressButtonClick()

function _onChangeBillingAddressButtonClick() {
  const elements = document.querySelectorAll("div[class*='ndern3']")

  if (elements.length === 0) return

  elements.forEach(element => {
    element.setAttribute("style", "cursor: pointer;")
    element.addEventListener("click", async () => {
      const name = await _openNameInputField("div[class*='kundennameinput2']")
      const street = await _openStreetInputField("div[class*='kundenstrasseinput2']")
      const zip = await _openZipInputField("div[class*='kundenplzinput2']")
      const email = await _openEmailInputField("div[class*='kundenemailinput2']")

      if (!window.localStorage.getItem("addresses")) {
        _noAddressFound()
        return
      }

      const addresses = JSON.parse(window.localStorage.getItem("addresses"))

      addresses.forEach(address => address.billingAddress = false)
      addresses.push({
        name,
        street,
        zip,
        email,
        shippingAddress: false,
        billingAddress: true
      })
      window.localStorage.setItem("addresses", JSON.stringify(addresses))
    })
  })
}
_onChangeBillingAddressButtonClick()

function _onChangePaymentButtonClick() {
  const elements = document.querySelectorAll("div[class*='ndern2']")

  if (elements.length === 0) return

  elements.forEach(element => {
    element.setAttribute("style", "cursor: pointer;")
    element.addEventListener("click", () => {
      window.location.assign("/loginbereich")
    })
  })
}
_onChangePaymentButtonClick()
