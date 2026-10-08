"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NETWORKS = void 0;
exports.getNetworkConfig = getNetworkConfig;
exports.NETWORKS = {
    testnet: {
        network: 'testnet',
        rpcUrl: process.env.STELLAR_RPC_URL || 'https://soroban-testnet.stellar.org:443',
        networkPassphrase: 'Test SDF Network ; September 2015',
        horizonUrl: 'https://horizon-testnet.stellar.org',
        explorerUrl: 'https://stellar.expert/explorer/testnet',
    },
    mainnet: {
        network: 'mainnet',
        rpcUrl: 'https://rpc.mainnet.stellar.org',
        networkPassphrase: 'Public Global Stellar Network ; September 2015',
        horizonUrl: 'https://horizon.stellar.org',
        explorerUrl: 'https://stellar.expert/explorer/public',
    },
};
function getNetworkConfig(network = 'testnet') {
    return exports.NETWORKS[network] || exports.NETWORKS.testnet;
}
