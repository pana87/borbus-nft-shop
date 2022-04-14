import { client } from "./client-for-hedera-testnet.mjs"

import { PrivateKey, AccountCreateTransaction } from "@hashgraph/sdk"

async function main() {
  const privateKey = PrivateKey.generateED25519()
  console.log(`PrivateKey: ${privateKey.toStringDer()}`);
  console.log(`PublicKey: ${privateKey.publicKey.toStringDer()}`);

  const accountCreateTx = await new AccountCreateTransaction()
    .setKey(privateKey)
    .setInitialBalance(1000)
    .execute(client)

  const accountCreateRx = await accountCreateTx.getReceipt(client)
  console.log(`Account creation: ${accountCreateRx.status}`);
  console.log(`AccountId: ${accountCreateRx.accountId}`);
}
main()
