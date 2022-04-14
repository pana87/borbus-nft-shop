export function createCollectionOneMetadata(collectionOne) {
  return collectionOne.map((item, index) => {
    return JSON.stringify({
      name: `Borbus - Collection One - Kleidchen #${index + 1}`,
      description: item.description,
      image: `https://${item.ipfs_car}.ipfs.nftstorage.link/1-${index + 1}/front.jpg`,
      properties: {
        ipfs_car: item.ipfs_car,
        ipfs_link: `ipfs://${item.ipfs_car}`,
        http_link: `https://${item.ipfs_car}.ipfs.nftstorage.link`,
        images: {
          front: `https://${item.ipfs_car}.ipfs.nftstorage.link/1-${index + 1}/front.jpg`,
          back: `https://${item.ipfs_car}.ipfs.nftstorage.link/1-${index + 1}/back.jpg`,
          detail: `https://${item.ipfs_car}.ipfs.nftstorage.link/1-${index + 1}/detail.jpg`,
        },
        attributes: item.attributes,
      }
    })
  })
}
