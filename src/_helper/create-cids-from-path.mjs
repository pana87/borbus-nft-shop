import dotenv from "dotenv"
dotenv.config()

import { NFTStorage } from "nft.storage"
import { getFilesFromPath } from "web3.storage"

const client = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN })

export async function createCidsFromPath(path) {
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
