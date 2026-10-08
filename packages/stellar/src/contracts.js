"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreasuryContractClient = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const config_js_1 = require("./config.js");
class TreasuryContractClient {
    server;
    contract;
    networkPassphrase;
    constructor(contractAddress, network = 'testnet') {
        const config = (0, config_js_1.getNetworkConfig)(network);
        this.server = new stellar_sdk_1.rpc.Server(config.rpcUrl);
        this.contract = new stellar_sdk_1.Contract(contractAddress);
        this.networkPassphrase = config.networkPassphrase;
    }
    async getTreasuryConfig() {
        try {
            const tx = await this.readContract('get_treasury_config', []);
            if (!tx || !tx.result)
                return null;
            const native = (0, stellar_sdk_1.scValToNative)(tx.result.retval);
            return {
                orgId: native.org_id?.toString() || 'ORG',
                admin: native.admin,
                asset: native.asset,
                status: typeof native.status === 'object' ? Object.keys(native.status)[0] : native.status,
                createdAt: Number(native.created_at || 0),
                nextRequestId: Number(native.next_request_id || 0),
                nextPolicyId: Number(native.next_policy_id || 0),
            };
        }
        catch (e) {
            return null;
        }
    }
    async getPolicy(spenderAddress) {
        try {
            const tx = await this.readContract('get_policy', [
                new stellar_sdk_1.Address(spenderAddress).toScVal(),
            ]);
            if (!tx || !tx.result)
                return null;
            const native = (0, stellar_sdk_1.scValToNative)(tx.result.retval);
            return {
                policyId: Number(native.policy_id || 0),
                spender: native.spender,
                asset: native.asset,
                spendingLimit: native.spending_limit?.toString() || '0',
                period: typeof native.period === 'object' ? Object.keys(native.period)[0] : native.period,
                approvalThreshold: native.approval_threshold?.toString() || '0',
                requiredApprovals: Number(native.required_approvals || 0),
                version: Number(native.version || 1),
                active: Boolean(native.active),
                createdAt: Number(native.created_at || 0),
                expiresAt: Number(native.expires_at || 0),
            };
        }
        catch (e) {
            return null;
        }
    }
    async getSpentAllowance(spenderAddress) {
        try {
            const tx = await this.readContract('get_spent_allowance', [
                new stellar_sdk_1.Address(spenderAddress).toScVal(),
            ]);
            if (!tx || !tx.result)
                return '0';
            const native = (0, stellar_sdk_1.scValToNative)(tx.result.retval);
            return native.toString();
        }
        catch (e) {
            return '0';
        }
    }
    async readContract(fnName, args) {
        // Contract simulation helper for read-only RPC queries
        const call = this.contract.call(fnName, ...args);
        const simulated = await this.server.simulateTransaction(new stellar_sdk_1.TransactionBuilder(new stellar_sdk_1.Account('GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF', '0'), { fee: '100', networkPassphrase: this.networkPassphrase })
            .addOperation(call)
            .setTimeout(30)
            .build());
        if (stellar_sdk_1.rpc.Api.isSimulationSuccess(simulated)) {
            return simulated;
        }
        return null;
    }
}
exports.TreasuryContractClient = TreasuryContractClient;
