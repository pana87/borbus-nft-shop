import { TokenNftInfoQuery, NftId, TokenId } from "@hashgraph/sdk"
import { client } from "./client-for-hedera-testnet.mjs"

async function main() {
  const tokenId = TokenId.fromString("0.0.34257672")
  const nftId = new NftId(tokenId, 1)

  const nftInfo = await new TokenNftInfoQuery()
    .setNftId(nftId)
    .execute(client)

  console.log(nftInfo);
  console.log(nftInfo[0].metadata);
  console.log(nftInfo[0].metadata.toString());
}
main()
