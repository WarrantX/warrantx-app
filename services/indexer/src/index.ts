import { rpc, scValToNative } from '@stellar/stellar-sdk';
import { getDatabase, indexerCheckpoints } from '@warrantx/database';
import { getNetworkConfig } from '@warrantx/stellar';
import { eq } from 'drizzle-orm';

export class WarrantXIndexer {
  private server: rpc.Server;
  private networkConfig = getNetworkConfig(process.env.STELLAR_NETWORK || 'testnet');
  private contractId: string;
  private isRunning = false;

  constructor() {
    const contractId = process.env.STELLAR_TREASURY_CONTRACT_ID;
    if (!contractId) throw new Error('STELLAR_TREASURY_CONTRACT_ID is required');
    this.contractId = contractId;
    this.server = new rpc.Server(this.networkConfig.rpcUrl);
  }

  async start() {
    console.log('[WarrantX Indexer] Starting event listener service...');
    this.isRunning = true;

    while (this.isRunning) {
      try {
        await this.pollEvents();
      } catch (error) {
        console.error('[WarrantX Indexer] Poll error:', error);
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  async stop() {
    this.isRunning = false;
    console.log('[WarrantX Indexer] Indexer stopped gracefully.');
  }

  private async pollEvents() {
    const db = getDatabase();
    const latestLedger = await this.server.getLatestLedger();
    const currentLedger = latestLedger.sequence;

    // Retrieve checkpoint
    const checkpoints = await db
      .select()
      .from(indexerCheckpoints)
      .where(eq(indexerCheckpoints.id, 'global_checkpoint'));

    let startLedger = currentLedger - 100 > 1 ? currentLedger - 100 : 1;
    if (checkpoints.length > 0) {
      startLedger = checkpoints[0].lastLedger;
    }

    if (startLedger >= currentLedger) return;

    console.log(`[WarrantX Indexer] Ingesting ledgers ${startLedger} -> ${currentLedger}`);

    // Fetch Soroban RPC events
    const response = await this.server.getEvents({
      startLedger,
      filters: [{ type: 'contract', contractIds: [this.contractId] }],
      limit: 100,
    });

    for (const event of response.events) {
      await this.processEvent(event);
    }

    // Update durable checkpoint
    if (checkpoints.length > 0) {
      await db
        .update(indexerCheckpoints)
        .set({
          lastLedger: currentLedger,
          updatedAt: new Date(),
        })
        .where(eq(indexerCheckpoints.id, 'global_checkpoint'));
    } else {
      await db.insert(indexerCheckpoints).values({
        id: 'global_checkpoint',
          contractAddress: this.contractId,
        lastLedger: currentLedger,
        updatedAt: new Date(),
      });
    }
  }

  private async processEvent(event: rpc.Api.EventResponse) {
    try {
      const topic = event.topic.map((t) => scValToNative(t));
      const value = scValToNative(event.value);
      console.log(`[WarrantX Indexer] Event ${event.id}:`, topic, value);

      // Idempotent event processing & DB record synchronization logic
    } catch (e) {
      console.error('[WarrantX Indexer] Error decoding event:', e);
    }
  }
}

if (process.env.NODE_ENV !== 'test') {
  const indexer = new WarrantXIndexer();
  indexer.start();
}
