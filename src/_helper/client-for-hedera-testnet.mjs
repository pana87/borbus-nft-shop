import dotenv from "dotenv"
dotenv.config()
import { Client, PrivateKey, AccountId } from "@hashgraph/sdk"

export const operatorId = AccountId.fromString(process.env.OPERATOR_ID)
export const operatorPrivateKey = PrivateKey.fromString(process.env.OPERATOR_PRIVATE_KEY)

export const client = Client.forTestnet().setOperator(operatorId, operatorPrivateKey)
