const fs = require("fs")
const fse = require("fs-extra")
/**
 * Deprecated
 * @param {} collectionOneMetadata
 */
module.exports.writeMetadataJsonFile = function (collectionOneMetadata) {
  const source = "/home/pnts/Downloads/compressed-nfts"
  const destination = "/home/pnts/Downloads/nft-metadata"

  fse.copySync(source, destination, { overwrite: true }, (error) => {
    if (error) {
      console.error(error)
      return
    }
  })

  collectionOneMetadata.forEach((data, index) => {
    fs.writeFile(`${destination}/1-${index + 1}/metadata.json`, data, (error) => {
      if (error) {
        console.error(error)
        return
      }
    })
  })
}
