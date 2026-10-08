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
export declare class TreasuryContractClient {
    private server;
    private contract;
    private networkPassphrase;
    constructor(contractAddress: string, network?: string);
    getTreasuryConfig(): Promise<TreasuryConfigOnChain | null>;
    getPolicy(spenderAddress: string): Promise<SpendingPolicyOnChain | null>;
    getSpentAllowance(spenderAddress: string): Promise<string>;
    private readContract;
}
