const fs = require("fs")
const { createCollectionOne } = require("./create-collection-one")
const { createCollectionOneMetadata } = require("./create-collection-one-metadata")
const { writeMetadataJsonFile } = require("./write-metadata-json-file")
const { createCidsFromPath } = require("./create-cids-from-path")

async function main() {

  const cids = await createCidsFromPath("/home/pnts/Downloads/compressed-nfts/")

  const collectionOne = createCollectionOne(cids)

  try {
    fs.writeFileSync(`${__dirname}/../_data/collection-one.json`, JSON.stringify(collectionOne))
  } catch (error) {
    console.error(error)
    return
  }

  const collectionOneMetadata = createCollectionOneMetadata(collectionOne)

  writeMetadataJsonFile(collectionOneMetadata)

  const cidsWithMetadata = await createCidsFromPath("/home/pnts/Downloads/nft-metadata/")

  try {
    fs.writeFileSync(`${__dirname}/../_data/collection-one-cids.json`, JSON.stringify(cidsWithMetadata))
  } catch (error) {
    console.error(error)
    return
  }
}
main()
