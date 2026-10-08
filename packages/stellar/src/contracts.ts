import { Contract, rpc, scValToNative, Address, xdr, Account, TransactionBuilder } from '@stellar/stellar-sdk';
import { getNetworkConfig } from './config.js';

export interface TreasuryConfigOnChain {
  orgId: string;
  admin: string;
  asset: string;
  status: string;
  createdAt: number;
  nextRequestId: number;
  nextPolicyId: number;
}

export interface SpendingPolicyOnChain {
  policyId: number;
  spender: string;
  asset: string;
  spendingLimit: string;
  period: 'Daily' | 'Weekly' | 'Monthly';
  approvalThreshold: string;
  requiredApprovals: number;
  version: number;
  active: boolean;
  createdAt: number;
  expiresAt: number;
}

export class TreasuryContractClient {
  private server: rpc.Server;
  private contract: Contract;
  private networkPassphrase: string;

  constructor(contractAddress: string, network = 'testnet') {
    const config = getNetworkConfig(network);
    this.server = new rpc.Server(config.rpcUrl);
    this.contract = new Contract(contractAddress);
    this.networkPassphrase = config.networkPassphrase;
  }

  async getTreasuryConfig(): Promise<TreasuryConfigOnChain | null> {
    try {
      const tx = await this.readContract('get_treasury_config', []);
      if (!tx || !tx.result) return null;
      const native = scValToNative(tx.result.retval);
      return {
        orgId: native.org_id?.toString() || 'ORG',
        admin: native.admin,
        asset: native.asset,
        status: typeof native.status === 'object' ? Object.keys(native.status)[0] : native.status,
        createdAt: Number(native.created_at || 0),
        nextRequestId: Number(native.next_request_id || 0),
        nextPolicyId: Number(native.next_policy_id || 0),
      };
    } catch (e) {
      return null;
    }
  }

  async getPolicy(spenderAddress: string): Promise<SpendingPolicyOnChain | null> {
    try {
      const tx = await this.readContract('get_policy', [
        new Address(spenderAddress).toScVal(),
      ]);
      if (!tx || !tx.result) return null;
      const native = scValToNative(tx.result.retval);
      return {
        policyId: Number(native.policy_id || 0),
        spender: native.spender,
        asset: native.asset,
        spendingLimit: native.spending_limit?.toString() || '0',
        period: typeof native.period === 'object' ? Object.keys(native.period)[0] as any : native.period,
        approvalThreshold: native.approval_threshold?.toString() || '0',
        requiredApprovals: Number(native.required_approvals || 0),
        version: Number(native.version || 1),
        active: Boolean(native.active),
        createdAt: Number(native.created_at || 0),
        expiresAt: Number(native.expires_at || 0),
      };
    } catch (e) {
      return null;
    }
  }

  async getSpentAllowance(spenderAddress: string): Promise<string> {
    try {
      const tx = await this.readContract('get_spent_allowance', [
        new Address(spenderAddress).toScVal(),
      ]);
      if (!tx || !tx.result) return '0';
      const native = scValToNative(tx.result.retval);
      return native.toString();
    } catch (e) {
      return '0';
    }
  }

  private async readContract(fnName: string, args: xdr.ScVal[]) {
    // Contract simulation helper for read-only RPC queries
    const call = this.contract.call(fnName, ...args);
    const simulated = await this.server.simulateTransaction(
      new TransactionBuilder(
        new Account('GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF', '0'),
        { fee: '100', networkPassphrase: this.networkPassphrase }
      )
        .addOperation(call)
        .setTimeout(30)
        .build()
    );

    if (rpc.Api.isSimulationSuccess(simulated)) {
      return simulated;
    }
    return null;
  }
}
