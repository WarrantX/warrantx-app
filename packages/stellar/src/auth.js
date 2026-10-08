"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChallenge = generateChallenge;
exports.verifyWalletSignature = verifyWalletSignature;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const crypto_1 = __importDefault(require("crypto"));
function generateChallenge(publicKey) {
    if (!stellar_sdk_1.StrKey.isValidEd25519PublicKey(publicKey)) {
        throw new Error('Invalid Stellar Ed25519 public key');
    }
    const randomBytes = crypto_1.default.randomBytes(32).toString('hex');
    const now = Date.now();
    const challenge = `WarrantX-Auth:${publicKey}:${randomBytes}:${now}`;
    return {
        challenge,
        expiresAt: now + 5 * 60 * 1000, // 5 minutes expiration
    };
}
function verifyWalletSignature(publicKey, challenge, signatureBase64) {
    try {
        if (!stellar_sdk_1.StrKey.isValidEd25519PublicKey(publicKey))
            return false;
        const parts = challenge.split(':');
        if (parts.length < 4 || parts[0] !== 'WarrantX-Auth' || parts[1] !== publicKey) {
            return false;
        }
        const timestamp = parseInt(parts[3], 10);
        if (isNaN(timestamp) || Date.now() - timestamp > 5 * 60 * 1000) {
            return false; // Challenge expired
        }
        const keypair = stellar_sdk_1.Keypair.fromPublicKey(publicKey);
        const messageBuffer = Buffer.from(challenge, 'utf-8');
        const signatureBuffer = Buffer.from(signatureBase64, 'base64');
        return keypair.verify(messageBuffer, signatureBuffer);
    }
    catch (error) {
        return false;
    }
}
