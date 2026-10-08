export interface WalletChallenge {
    challenge: string;
    expiresAt: number;
}
export declare function generateChallenge(publicKey: string): WalletChallenge;
export declare function verifyWalletSignature(publicKey: string, challenge: string, signatureBase64: string): boolean;
