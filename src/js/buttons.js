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

function _onLoginButtonClick() {
  const loginButtons = document.querySelectorAll("div[class*='login1']")

  if (loginButtons.length === 0) return

  loginButtons.forEach(button => {
    button.setAttribute("style", "cursor: pointer;")
    button.addEventListener("click", async () => {

      // get input data

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


      // console.log(document.referrer);
      // console.log(document.referrer.endsWith("/warenkorb/"));

      if (document.referrer.endsWith("/warenkorb/")) {
        window.location.assign("/bestellubersicht")
        return
      }
      window.location.assign("/accountuebersicht")

    })
  })
  // console.log(loginButtons);
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

      // console.log("lets go");

      const securityKey = prompt("Bitte geben Sie Ihren Sicherheitsschlüssel ein")
      if (securityKey === null || securityKey.length === 0) return
      // console.log("securityKey", securityKey);

      ///////////////////////////////////////////////////////////////////////////////////////////////

      const securityKeyAsBytes = new TextEncoder().encode(securityKey)
      // console.log("secretKeyAsBytes", secretKeyAsBytes);

      const session = new Uint8Array(JSON.parse(window.sessionStorage.getItem("userSession")).data)
      // console.log(session);
      const accountId = JSON.parse(window.sessionStorage.getItem("userSession")).accountId
      // console.log(accountId);

      // const privateKey = new Uint8Array(JSON.parse(window.sessionStorage.getItem("userSession")).privateKey)
      // console.log("accountId", accountId);

      // const SALT = privateKey.slice(0, 32)
      // console.log("SALT", SALT);

      // const IV = privateKey.slice(32, 44)
      // console.log("IV", IV);

      // const encryptedData = privateKey.slice(32 + 12)
      // console.log("encryptedData", encryptedData);



      // const passwordKey = await window.crypto.subtle.importKey(
      //   "raw",
      //   secretKeyAsBytes,
      //   "PBKDF2",
      //   false,
      //   ["deriveKey"]
      // )
      // console.log("passwordkey", passwordKey);

      // // console.log("privateKey", privateKey);

      // // const salt = new Uint8Array(privateKey.slice(0, 32))

      // // const salt = window.crypto.getRandomValues(new Uint8Array(32))
      // // const salt =
      // // console.log("salt", salt);
      // const aesKey = await window.crypto.subtle.deriveKey({
      //   name: "PBKDF2",
      //   hash: { name: "SHA-256" },
      //   salt: SALT,
      //   iterations: 250000,
      // }, passwordKey, { name: "AES-GCM", length: 256 }, false, ["decrypt"])
      // console.log("aesKey", aesKey);

      // // const iv = window.crypto.getRandomValues(new Uint8Array(12))




      // // const iv = window.crypto.getRandomValues(new Uint8Array(12))
      // const decryptedContent = await window.crypto.subtle.decrypt({
      //   name: "AES-GCM",
      //   iv: IV,
      // }, aesKey, encryptedData)
      // console.log("decryptedContent", decryptedContent);

      // const data = new Uint8Array(decryptedContent)
      // console.log("data", data);

      // const decodedData = new TextDecoder().decode(data)
      // console.log("decoded data", decodedData);

      // /////////////////////////////////////////////////////////////////////////////////////////

      const cartItem = JSON.parse(window.localStorage.getItem("cart"))[0]
      // console.log(cart);

      const addresses = JSON.parse(window.localStorage.getItem("addresses"))
      // console.log(addresses);

      const shippingAddress = addresses.filter(it => it.shippingAddress === true)[0]
      const billingAddress = addresses.filter(it => it.billingAddress === true)[0]
      // const hbarAmount =
      const hbarTotalElements = document.querySelectorAll("div[class*='hbar-gesamtkosten-rechner']")

      // if (hbarTotalElements.length === 0) return

      // let hbarAmount
      // hbarTotalElements.forEach(element => {

      // })

      let renderedHbarPrice
      hbarTotalElements.forEach(element => {
        renderedHbarPrice = element.innerHTML
      })
      // console.log(lastHbarPrice.trim().split(" "))
      // console.log()
      const previousHbarPrice = parseFloat(renderedHbarPrice.trim().split(" ")[0])
      // console.log(previousHbarPrice);

      const cart = JSON.parse(window.localStorage.getItem("cart")) || []

      if (cart.length === 0) {
        _noCartItemFound()
        return
      }

      const itemPrice = parseFloat(cart[0].price.replace(",", "."))
      // console.log(item);
      // const itemPrice = parseFloat(item.price.replace(",", "."))
      // console.log(itemPrice);
      const currentHbarPrice = await getPriceInHbar(itemPrice)
      // console.log(parseFloat(currentHbarPrice.toFixed(8)))
      const priceInTinybars = currentHbarPrice.toFixed(8).replace(".", "")

      if (previousHbarPrice !== parseFloat(currentHbarPrice.toFixed(8))) {
        alert("Der Hbar Preis wurde aktualisiert")
        hbarTotalElements.forEach(element => element.innerHTML = `${currentHbarPrice.toFixed(8)} ℏ`)
        return
      }


      const body = {
        accountId,
        session,
        securityKeyAsBytes,
        cartItem,
        shippingAddress,
        billingAddress,
        currentHbarPrice,
      }
      console.log(body);
      console.log(JSON.stringify(body));

      // return

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

      // console.log("hi");
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
