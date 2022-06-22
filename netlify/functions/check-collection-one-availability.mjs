import { TokenNftInfoQuery, NftId } from "@hashgraph/sdk"
import { collectionOneTokenId } from "../../src/_helper/HederaTestAccounts.mjs"
import { client, operatorId } from "../../src/_helper/client-for-hedera-testnet.mjs"

export const handler = async (event, context) => {
  const body = []
  for (let i = 1; i <= 24; i++) {
    try {
      const nftInfoTx = await new TokenNftInfoQuery()
        .setNftId(new NftId(collectionOneTokenId, i))
        .execute(client)

      body.push({
        serial: i,
        treasuryId: operatorId.toString(),
        owner: nftInfoTx[0].accountId.toString(),
        metadata: nftInfoTx[0].metadata.toString(),
      })
    } catch (error) {
      console.error(error);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
}
