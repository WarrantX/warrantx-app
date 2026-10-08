export interface StellarNetworkConfig {
  network: 'testnet' | 'mainnet' | 'futurenet' | 'local';
  rpcUrl: string;
  networkPassphrase: string;
  horizonUrl: string;
  explorerUrl: string;
}

export const NETWORKS: Record<string, StellarNetworkConfig> = {
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

export function getNetworkConfig(network = 'testnet'): StellarNetworkConfig {
  return NETWORKS[network] || NETWORKS.testnet;
}
