export interface StellarNetworkConfig {
    network: 'testnet' | 'mainnet' | 'futurenet' | 'local';
    rpcUrl: string;
    networkPassphrase: string;
    horizonUrl: string;
    explorerUrl: string;
}
export declare const NETWORKS: Record<string, StellarNetworkConfig>;
export declare function getNetworkConfig(network?: string): StellarNetworkConfig;
