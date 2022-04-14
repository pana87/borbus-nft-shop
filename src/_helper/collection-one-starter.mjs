import dotenv from "dotenv"
dotenv.config()
import fs from "fs"
import { createCollectionOneMetadata } from "./create-collection-one-metadata.mjs"
import { createCollectionOne } from "./create-collection-one.mjs"
import { NFTStorage, Blob } from "nft.storage"

const client = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN })

import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


async function main() {
  const collectionOne = await createCollectionOne()
  const collectionOneMetadata = createCollectionOneMetadata(collectionOne)

  const cids = []
  for (const element of collectionOneMetadata) {
    const blob = new Blob([element])
    const cid = await client.storeBlob(blob)
    cids.push(cid)
  }

  try {
    fs.writeFileSync(`${__dirname}/../_data/collection-one.json`, JSON.stringify(collectionOne))
  } catch (error) {
    console.error(error)
    return
  }

  try {
    fs.writeFileSync(`${__dirname}/../_data/collection-one-metadata.json`, JSON.stringify(cids))
  } catch (error) {
    console.error(error)
    return
  }
}
main()
