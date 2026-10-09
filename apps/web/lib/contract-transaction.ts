'use client';

import { signTransaction } from '@stellar/freighter-api';
import { Account, Contract, rpc, TransactionBuilder, xdr } from '@stellar/stellar-sdk';

const RPC_URL = process.env.NEXT_PUBLIC_STELLAR_RPC_URL || 'https://soroban-testnet.stellar.org';
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';

export type ContractTransactionResult = {
  hash: string;
  result?: xdr.ScVal;
};

function freighterError(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return 'Freighter rejected the transaction';
}

export async function submitContractTransaction(
  contractId: string,
  method: string,
  args: xdr.ScVal[],
  signer: string,
): Promise<ContractTransactionResult> {
  const server = new rpc.Server(RPC_URL);
  const source = await server.getAccount(signer);
  const operation = new Contract(contractId).call(method, ...args);
  const transaction = new TransactionBuilder(new Account(source.accountId(), source.sequenceNumber()), {
    fee: '100000',
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(operation)
    .setTimeout(60)
    .build();

  const simulation = await server.simulateTransaction(transaction);
  if (!rpc.Api.isSimulationSuccess(simulation)) {
    throw new Error('Soroban simulation failed. Check the contract arguments and account balance.');
  }

  const prepared = rpc.assembleTransaction(transaction, simulation).build();
  const signed = await signTransaction(prepared.toXDR(), {
    address: signer,
    networkPassphrase: NETWORK_PASSPHRASE,
  });
  if (signed.error || !signed.signedTxXdr) {
    throw new Error(freighterError(signed.error));
  }

  const signedTransaction = TransactionBuilder.fromXDR(signed.signedTxXdr, NETWORK_PASSPHRASE);
  const submission = await server.sendTransaction(signedTransaction);
  if (submission.status === 'ERROR') throw new Error('Stellar RPC rejected the signed transaction.');

  for (let attempt = 0; attempt < 30; attempt += 1) {
    await new Promise((resolve) => window.setTimeout(resolve, 1000));
    const result = await server.getTransaction(submission.hash);
    if (result.status === rpc.Api.GetTransactionStatus.SUCCESS) {
      return { hash: submission.hash, result: result.returnValue };
    }
    if (result.status === rpc.Api.GetTransactionStatus.FAILED) {
      throw new Error('The transaction failed on Stellar Testnet.');
    }
  }

  throw new Error(`Transaction ${submission.hash} is still pending. Check it in Stellar Explorer.`);
}

export function toStroops(value: string): bigint {
  const normalized = value.trim();
  if (!/^\d+(\.\d{1,7})?$/.test(normalized)) throw new Error('Enter a positive amount with no more than 7 decimal places.');
  const [whole, fraction = ''] = normalized.split('.');
  const amount = BigInt(whole) * 10_000_000n + BigInt(fraction.padEnd(7, '0'));
  if (amount <= 0n) throw new Error('Amount must be greater than zero.');
  return amount;
}
