const collectionOne = require("../../src/_data/collection-one.json")

module.exports = () => {
  return collectionOne.map((item, index) => {
    return {
      id: index + 1,
      ipfs_car: item.ipfs_car,
      name: `Kleidchen #${index + 1}`,
      price: item.price,
      description: item.description,
      attributes: item.attributes,
      images: {
        front: `https://${item.ipfs_car}.ipfs.nftstorage.link/1-${index + 1}/front.jpg`,
        back: `https://${item.ipfs_car}.ipfs.nftstorage.link/1-${index + 1}/back.jpg`,
        detail: `https://${item.ipfs_car}.ipfs.nftstorage.link/1-${index + 1}/detail.jpg`,
      },
      links: {
        overview: `https://borbus-shop.com/produktansicht${index + 1}`,
        detail: `https://borbus-shop.com/produktansichtdetail${index + 1}`,
      }
    }
  })
}

