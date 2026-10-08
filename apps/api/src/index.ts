import express from 'express';
import cors from 'cors';
import { generateChallenge, verifyWalletSignature } from '@warrantx/stellar';
import { getDatabase, treasuries, paymentRequests, spendingPolicies, users } from '@warrantx/database';
import { ChallengeRequestSchema, ChallengeVerifySchema } from '@warrantx/validation';
import crypto from 'crypto';

const app = express();
const allowedOrigin = process.env.AUTH_ALLOWED_ORIGIN || 'http://localhost:3000';
app.disable('x-powered-by');
app.use(cors({ origin: allowedOrigin, methods: ['GET', 'POST'], maxAge: 86400 }));
app.use(express.json({ limit: '32kb' }));

const PORT = process.env.PORT || 3001;
const issuedChallenges = new Map<string, number>();

function createSessionToken(publicKey: string): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_SECRET must contain at least 32 characters');
  }
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(JSON.stringify({ sub: publicKey, iat: issuedAt, exp: issuedAt + 3600 })).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

// Health Endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'WarrantX API',
    timestamp: new Date().toISOString(),
  });
});

// Auth Routes
app.post('/api/v1/auth/challenge', (req, res) => {
  try {
    const parse = ChallengeRequestSchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ error: parse.error.format() });
    const challenge = generateChallenge(parse.data.publicKey);
    issuedChallenges.set(challenge.challenge, challenge.expiresAt);
    res.json(challenge);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/v1/auth/verify', async (req, res) => {
  try {
    const parse = ChallengeVerifySchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ error: parse.error.format() });

    const expiresAt = issuedChallenges.get(parse.data.challenge);
    issuedChallenges.delete(parse.data.challenge);
    const isValid = Boolean(expiresAt && expiresAt >= Date.now()) && verifyWalletSignature(
      parse.data.publicKey,
      parse.data.challenge,
      parse.data.signature
    );

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid wallet signature or challenge expired' });
    }

    res.json({
      authenticated: true,
      publicKey: parse.data.publicKey,
      token: createSessionToken(parse.data.publicKey),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Treasuries Routes
app.get('/api/v1/treasuries', async (req, res) => {
  try {
    const db = getDatabase();
    const list = await db.select().from(treasuries);
    res.json({ data: list });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Payment Requests Routes
app.get('/api/v1/payments', async (req, res) => {
  try {
    const db = getDatabase();
    const list = await db.select().from(paymentRequests);
    res.json({ data: list });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Spending Policies Routes
app.get('/api/v1/policies', async (req, res) => {
  try {
    const db = getDatabase();
    const list = await db.select().from(spendingPolicies);
    res.json({ data: list });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[WarrantX API] Server running on http://localhost:${PORT}`);
  });
}

export default app;
