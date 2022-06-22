import { client, operatorId, operatorPrivateKey } from "./client-for-hedera-testnet.mjs"

import { PrivateKey, AccountCreateTransaction, ExchangeRate, TransferTransaction, AccountId, Hbar } from "@hashgraph/sdk"
import { accountBalanceChecker } from "./account-balance-checker.mjs"

async function main() {
  const userId = AccountId.fromString("0.0.34903161")

  const hbarTransferTx = await new TransferTransaction()
    .addHbarTransfer(operatorId, new Hbar(1000).negated())
    .addHbarTransfer(userId, new Hbar(1000))
    .freezeWith(client)
    .sign(operatorPrivateKey)

  const hbarTransferSubmit = await hbarTransferTx.execute(client)
  const hbarTransferRx = await hbarTransferSubmit.getReceipt(client)
  console.log(`Hbar transfer: ${hbarTransferRx.status}`);

  accountBalanceChecker("Operator Account", operatorId, client)
  accountBalanceChecker("User Account", userId, client)

}
main()
