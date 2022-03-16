require("dotenv").config()

const { NFTStorage } = require("nft.storage")
const { getFilesFromPath } = require("web3.storage")

const client = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN })

module.exports.createCidsFromPath = async function (path) {
  const cids = []
  const paths = []
  for (let i = 1; i <= 24; i++) {
    paths.push(`${path}1-${i}`)
  }

  for (const path of paths) {
    const directories = await getFilesFromPath(path)

    try {
      cids.push(await client.storeDirectory(directories))
    } catch (error) {
      console.log(error)
      return
    }
  }
  return cids
}
