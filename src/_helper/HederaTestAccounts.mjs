import { AccountId, PrivateKey, TokenId } from "@hashgraph/sdk"
import collectionOneToken from "../_data/collection-one-nft-token.json" assert { type: "json" }

export const userId1 = AccountId.fromString(process.env.userId1)
export const userKey1 = PrivateKey.fromStringED25519(process.env.userKey1)

export const collectionOneTokenId = TokenId.fromString(`${collectionOneToken.shard.low}.${collectionOneToken.realm.low}.${collectionOneToken.num.low}`)
