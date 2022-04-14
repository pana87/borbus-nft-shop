import { webcrypto } from "node:crypto"
import collectionOneToken from "../../src/_data/collection-one-nft-token.json" assert { type: "json" }

import { TokenAssociateTransaction, AccountId, TokenId, PrivateKey, TransferTransaction, Hbar, HbarUnit, Status } from "@hashgraph/sdk"

import { client, operatorId, operatorPrivateKey } from "../../src/_helper/client-for-hedera-testnet.mjs"
import { accountBalanceChecker } from "../../src/_helper/account-balance-checker.mjs"

// import { nodemailer } from "nodemailer"
import { sendConfirmationEmail } from "../../src/_helper/SendConfirmationEmail.mjs"

export const handler = async (event, context) => {

  console.log(JSON.parse(event.body))
  const data = JSON.parse(event.body)
  const session = new Uint8Array(Object.values(data.session))

  const treasuryId = operatorId
  const treasuryKey = operatorPrivateKey

  let userId
  try {
    userId = AccountId.fromString(data.accountId)
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "INVALID_ACCOUNT_ID"
    }
  }

  const salt = session.slice(0, 32)
  const iv = session.slice(32, 44)
  const encryptedPrivateKey = session.slice(32 + 12)
  const securityKeyAsBytes = new Uint8Array(Object.values(data.securityKeyAsBytes))

  const passwordKey = await webcrypto.subtle.importKey(
    "raw",
    securityKeyAsBytes,
    "PBKDF2",
    false,
    ["deriveKey"]
  )

  const aesKey = await webcrypto.subtle.deriveKey({
    name: "PBKDF2",
    hash: { name: "SHA-256" },
    salt: salt,
    iterations: 250000,
  }, passwordKey, { name: "AES-GCM", length: 256 }, false, ["decrypt"])

  let decryptedPrivateKeyAsBuffer
  try {
    decryptedPrivateKeyAsBuffer = await webcrypto.subtle.decrypt({
      name: "AES-GCM",
      iv: iv,
    }, aesKey, encryptedPrivateKey)
  } catch (error) {
    return {
      statusCode: 500,
      body: "INVALID_SECURITY_KEY"
    }
  }

  const decryptedPrivateKeyAsBytes = new Uint8Array(decryptedPrivateKeyAsBuffer)
  const decryptedPrivateKey = new TextDecoder().decode(decryptedPrivateKeyAsBytes)

  let userPrivateKey
  try {
    userPrivateKey = PrivateKey.fromStringED25519(decryptedPrivateKey)
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "INVALID_PRIVATE_KEY"
    }
  }

  const collectionOneTokenId = TokenId.fromString(`${collectionOneToken.shard.low}.${collectionOneToken.realm.low}.${collectionOneToken.num.low}`)

  // associate account
  try {
    const associateAccountTx = await new TokenAssociateTransaction()
      .setAccountId(userId)
      .setTokenIds([collectionOneTokenId])
      .freezeWith(client)
      .sign(userPrivateKey)

    const associateAccountTxSubmit = await associateAccountTx.execute(client)
    const associateAccountRx = await associateAccountTxSubmit.getReceipt(client)
    console.log(`Account association: ${associateAccountRx.status}`);
  } catch (error) {
    console.error(error);
    console.error(Status._fromCode(error.status._code).toString())
  }


  const priceInTinybars = Hbar.fromTinybars(data.priceInTinybars)


  const treasuryAccountBalance = await accountBalanceChecker("Treasury Account", treasuryId, client)
  const userAccountBalance = await accountBalanceChecker("User Account", userId, client)

  // console.log(treasuryAccountBalance.tokens);
  // console.log(userAccountBalance.tokens);

  // transfer nft
  try {
    const tokenTransferTx = await new TransferTransaction()
      .addNftTransfer(collectionOneTokenId, data.cartItem.id, treasuryId, userId)
      .addHbarTransfer(treasuryId, priceInTinybars)
      .addHbarTransfer(userId, priceInTinybars.negated())
      .freezeWith(client)
      .sign(userPrivateKey)

    const tokenTransferSubmit = await tokenTransferTx.execute(client)
    const tokenTransferRx = await tokenTransferSubmit.getReceipt(client)
    console.log(`NFT transfer: ${tokenTransferRx.status}`)
  } catch (error) {
    console.error(error);
    console.error(Status._fromCode(error.status._code).toString())
    if (error.status._code === Status.InsufficientAccountBalance._code) {
      return {
        statusCode: 500,
        body: Status.InsufficientAccountBalance.toString()
      }
    }
    if (error.status._code === Status.SenderDoesNotOwnNftSerialNo._code) {
      return {
        statusCode: 500,
        body: Status.SenderDoesNotOwnNftSerialNo.toString()
      }
    }
  }


  // send email
  sendConfirmationEmail(event.body)
  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'p.tsivelekidis@get-your.de',
  //     pass: '8~$n4po^YttF^k5NX%ViX~pUc6BJvh%b'
  //   }
  // });

  // var mailOptions = {
  //   from: '"Pana Boo 👻" <p.tsivelekidis@get-your.de>',
  //   to: 'p.tsivelekidis@gmail.com, f.steck@get-your.de',
  //   subject: 'Damn. Ein Kleidchen wurde verkauft.',
  //   html: `<div>${event.body}</div>`
  // };

  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });





  return {
    statusCode: 200,
    body: ""
  }
}
