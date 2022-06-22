import { HashConnect } from "hashconnect"

export const handler = async (event, context) => {
  const hashconnect = new HashConnect()
  console.log(hashconnect)



  // const state = await hashconnect.connect()
  // console.log(state);

  // const initData = await hashconnect.init({
  //   name: "Borbus NFT Shop",
  //   description: "Hedera dApp for Borbus",
  //   icon: "https://fontawesome.com/v4/icon/address-book"
  // })

  // const initData = await hashconnect.init(appMetadata)
  // console.log(initData);

  return {
    statusCode: 200,
    body: "OK"
  }
}
