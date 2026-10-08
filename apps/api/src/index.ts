import express from 'express';
import cors from 'cors';
import { generateChallenge, verifyWalletSignature } from '@warrantx/stellar';
import { getDatabase, treasuries, paymentRequests, spendingPolicies, users } from '@warrantx/database';
import { ChallengeRequestSchema, ChallengeVerifySchema } from '@warrantx/validation';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

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
    res.json(challenge);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/v1/auth/verify', async (req, res) => {
  try {
    const parse = ChallengeVerifySchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ error: parse.error.format() });

    const isValid = verifyWalletSignature(
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
      token: `warrantx_sess_${Buffer.from(parse.data.publicKey).toString('hex').slice(0, 16)}`,
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
