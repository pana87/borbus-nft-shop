const collectionOne = require("./collection-one.json")

module.exports = () => {
  return collectionOne.map((item, index) => {
    return {
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
        overview: `https://borbus-shop.com/produktansicht-kleidchen-${index + 1}`,
        detail: `https://borbus-shop.com/produktansichtdetail-kleidchen-${index + 1}`,
      },
      available: true,
    }
  })
}
