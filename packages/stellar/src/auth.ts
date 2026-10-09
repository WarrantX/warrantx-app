import { Keypair, StrKey } from '@stellar/stellar-sdk';
import crypto from 'crypto';

export interface WalletChallenge {
  challenge: string;
  expiresAt: number;
}

export function generateChallenge(publicKey: string): WalletChallenge {
  if (!StrKey.isValidEd25519PublicKey(publicKey)) {
    throw new Error('Invalid Stellar Ed25519 public key');
  }

  const randomBytes = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  const challenge = `WarrantX-Auth:${publicKey}:${randomBytes}:${now}`;

  return {
    challenge,
    expiresAt: now + 5 * 60 * 1000, // 5 minutes expiration
  };
}

export function verifyWalletSignature(
  publicKey: string,
  challenge: string,
  signatureBase64: string
): boolean {
  try {
    if (!StrKey.isValidEd25519PublicKey(publicKey)) return false;

    const parts = challenge.split(':');
    if (parts.length < 4 || parts[0] !== 'WarrantX-Auth' || parts[1] !== publicKey) {
      return false;
    }

    const timestamp = parseInt(parts[3], 10);
    const age = Date.now() - timestamp;
    if (isNaN(timestamp) || age < 0 || age > 5 * 60 * 1000) {
      return false; // Challenge expired
    }

    const keypair = Keypair.fromPublicKey(publicKey);
    // Freighter signMessage implements SEP-53: prefix the UTF-8 message and
    // sign a single SHA-256 digest instead of signing the raw message bytes.
    const encodedMessage = Buffer.concat([
      Buffer.from('Stellar Signed Message:\n', 'utf-8'),
      Buffer.from(challenge, 'utf-8'),
    ]);
    const messageBuffer = crypto.createHash('sha256').update(encodedMessage).digest();
    const signatureBuffer = Buffer.from(signatureBase64, 'base64');

    return keypair.verify(messageBuffer, signatureBuffer);
  } catch (error) {
    return false;
  }
}
