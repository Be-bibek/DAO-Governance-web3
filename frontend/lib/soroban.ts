import * as Governance from 'governance';
import * as Treasury from 'treasury';
import { Networks, TransactionBuilder, rpc } from '@stellar/stellar-sdk';
import { StellarWalletsKit } from '@creit.tech/stellar-wallets-kit';

export const RPC_URL = 'https://soroban-testnet.stellar.org:443';
export const NETWORK_PASSPHRASE = Networks.TESTNET;
export const server = new rpc.Server(RPC_URL);

// Our freshly deployed contracts
export const GOVERNANCE_CONTRACT_ID = 'CDQTIDYF23ZOPCO7PM2COAHMYAL46IYL4VUG7EDFQ5FXU6LEKRL2CXJF';
export const TREASURY_CONTRACT_ID = 'CDBG6CZ6DPMULBZP3UMUROTHQQO7KBAFKBXOSLKAXECJBIODY5QJ4A6W';

/**
 * Returns a configured Governance contract client ready to sign & submit transactions.
 */
export function getGovernanceClient(publicKey?: string) {
  return new Governance.Client({
    networkPassphrase: NETWORK_PASSPHRASE,
    contractId: GOVERNANCE_CONTRACT_ID,
    rpcUrl: RPC_URL,
    publicKey,
    signTransaction: async (xdr: string) => {
      if (!publicKey) throw new Error("Wallet not connected");
      try {
        const { signedTxXdr } = await StellarWalletsKit.signTransaction(xdr, {
          networkPassphrase: NETWORK_PASSPHRASE,
          address: publicKey,
        });
        return { signedTxXdr };
      } catch (e: any) {
        if (e.message?.includes('User declined') || e.message?.includes('rejected')) {
          throw new Error('Wallet interaction was rejected by the user.');
        }
        throw e;
      }
    }
  });
}

/**
 * Custom Error Mapping for DAO
 */
export function mapSorobanError(error: any): Error {
  if (error instanceof Error) {
    if (error.message.includes('User declined') || error.message.includes('rejected')) {
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
