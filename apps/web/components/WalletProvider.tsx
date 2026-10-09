'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  getAddress,
  getNetworkDetails,
  isAllowed,
  isConnected,
  requestAccess,
  signMessage,
} from '@stellar/freighter-api';

type WalletContextValue = {
  address: string | null;
  error: string | null;
  isConnecting: boolean;
  network: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

function apiError(error: unknown, fallback: string) {
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return fallback;
}

function signatureToBase64(signature: Buffer | string | null): string {
  if (!signature) throw new Error('Freighter did not return a signature');
  if (typeof signature === 'string') return signature;
  let binary = '';
  for (const byte of signature) binary += String.fromCharCode(byte);
  return window.btoa(binary);
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const loadWallet = useCallback(async () => {
    const connection = await isConnected();
    if (connection.error || !connection.isConnected) return;
    const permission = await isAllowed();
    if (permission.error || !permission.isAllowed) return;
    const account = await getAddress();
    if (account.error || !account.address) return;
    const details = await getNetworkDetails();
    setAddress(account.address);
    setNetwork(details.error ? null : details.network);
  }, []);

  useEffect(() => {
    void loadWallet();
  }, [loadWallet]);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const connection = await isConnected();
      if (connection.error || !connection.isConnected) {
        throw new Error('Freighter was not detected. Install or unlock the Freighter browser extension and try again.');
      }

      const access = await requestAccess();
      if (access.error || !access.address) {
        throw new Error(apiError(access.error, 'Wallet access was not approved'));
      }

      const details = await getNetworkDetails();
      if (details.error) throw new Error(apiError(details.error, 'Unable to read the selected Stellar network'));
      if (details.network.toUpperCase() !== 'TESTNET') {
        throw new Error('Switch Freighter to Stellar Testnet, then connect again.');
      }

      const challengeResponse = await fetch('/api/v1/auth/challenge', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ publicKey: access.address }),
      });
      if (!challengeResponse.ok) throw new Error('The WarrantX authentication service is unavailable');
      const challenge = await challengeResponse.json() as { challenge: string };
      const signed = await signMessage(challenge.challenge, { address: access.address });
      if (signed.error) throw new Error(apiError(signed.error, 'The authentication signature was rejected'));

      const verificationResponse = await fetch('/api/v1/auth/verify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          publicKey: access.address,
          challenge: challenge.challenge,
          signature: signatureToBase64(signed.signedMessage),
        }),
      });
      const verification = await verificationResponse.json() as { token?: string; error?: string };
      if (!verificationResponse.ok || !verification.token) {
        throw new Error(verification.error || 'Wallet authentication failed');
      }

      window.sessionStorage.setItem('warrantx_session', verification.token);
      setAddress(access.address);
      setNetwork(details.network);
    } catch (connectionError) {
      setAddress(null);
      setNetwork(null);
      setError(connectionError instanceof Error ? connectionError.message : 'Unable to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    window.sessionStorage.removeItem('warrantx_session');
    setAddress(null);
    setNetwork(null);
    setError(null);
  }, []);

  const value = useMemo(() => ({ address, error, isConnecting, network, connect, disconnect }), [address, error, isConnecting, network, connect, disconnect]);
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const value = useContext(WalletContext);
  if (!value) throw new Error('useWallet must be used inside WalletProvider');
  return value;
}
