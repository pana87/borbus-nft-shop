export function _noCartItemFound() {
  alert("Sie haben kein Kleidchen im Warenkorb")
  window.location.assign("/shop")
}

export function _noUserSessionFound() {
  alert("Sie müssen sich erst einloggen")
  window.location.assign("/loginbereich")
}

export function _noUserFound() {
  alert("Es sind keine Kontaktinformationen vorhanden")
  window.location.assign("/bestellformular")
}

export function _noAccountIdFound() {
  alert("Es wurde keine Hedera Account Id gefunden. Bitte loggen Sie sich erneut ein.")
  window.location.assign("/loginbereich")
}

export function _noAddressFound() {
  alert("Wir konnten keine Lieferadresse finden. Bitte registrieren Sie sich.")
  window.location.assign("/bestellformular")
}
