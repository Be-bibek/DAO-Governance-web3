import { rpc, TransactionBuilder, Networks, SorobanRpc, xdr, Contract, Asset } from '@stellar/stellar-sdk';
import { StellarWalletsKit } from '@creit.tech/stellar-wallets-kit';

export const RPC_URL = 'https://soroban-testnet.stellar.org:443';
export const NETWORK_PASSPHRASE = Networks.TESTNET;

// Contract addresses (to be updated after deployment)
export const TREASURY_CONTRACT_ID = 'TODO';
export const GOVERNANCE_CONTRACT_ID = 'TODO';

export const server = new rpc.Server(RPC_URL);

/**
 * Custom Error Mapping for DAO
 */
export class SorobanError extends Error {
  constructor(message: string, public code?: number) {
    super(message);
    this.name = 'SorobanError';
  }
}

export function mapSorobanError(error: any): Error {
  if (error instanceof Error) {
    if (error.message.includes('User declined')) {
      return new Error('Wallet interaction was rejected by the user.');
    }
    if (error.message.includes('Voting period has ended')) {
      return new Error('The voting period for this proposal has already ended.');
    }
    if (error.message.includes('Voter has already voted')) {
      return new Error('You have already cast a vote for this proposal.');
    }
    if (error.message.includes('Proposal did not pass')) {
      return new Error('This proposal failed to pass and cannot be executed.');
    }
    return error;
  }
  return new Error('An unknown error occurred during the transaction.');
}

export async function submitTransaction(
  transaction: any,
  publicKey: string
) {
  try {
    const { signedTxXdr } = await StellarWalletsKit.signTransaction(transaction.toXDR(), {
      networkPassphrase: NETWORK_PASSPHRASE,
      address: publicKey,
    });

    const parsedTx = TransactionBuilder.fromXDR(signedTxXdr, NETWORK_PASSPHRASE);
    const response = await server.sendTransaction(parsedTx as any);

    if (response.status === 'ERROR') {
      throw new Error(`Transaction submission failed: ${response.errorResultXdr}`);
    }

    return response.hash;
  } catch (err) {
    throw mapSorobanError(err);
  }
}

export async function pollTransaction(txHash: string): Promise<SorobanRpc.Api.GetTransactionResponse> {
  const MAX_ATTEMPTS = 15;
  const POLLING_INTERVAL = 3000;

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const response = await server.getTransaction(txHash);
    
    if (response.status === 'SUCCESS') {
      return response;
    } else if (response.status === 'FAILED') {
      throw new Error(`Transaction failed on ledger. Hash: ${txHash}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, POLLING_INTERVAL));
  }
  
  throw new Error('Transaction confirmation timed out.');
}
