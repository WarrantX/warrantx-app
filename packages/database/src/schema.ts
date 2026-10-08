import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  bigint,
  jsonb,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';

// Users
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email'),
  publicKey: text('public_key').notNull().unique(),
  role: text('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// User Wallets
export const userWallets = pgTable('user_wallets', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  publicKey: text('public_key').notNull(),
  label: text('label'),
  isPrimary: boolean('is_primary').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Sessions
export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Organizations
export const organizations = pgTable('organizations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  orgCode: text('org_code').notNull().unique(),
  ownerId: text('owner_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Organization Members
export const organizationMembers = pgTable('organization_members', {
  id: text('id').primaryKey(),
  orgId: text('org_id').references(() => organizations.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  role: text('role').default('member').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Treasuries
export const treasuries = pgTable('treasuries', {
  id: text('id').primaryKey(),
  orgId: text('org_id').references(() => organizations.id).notNull(),
  name: text('name').notNull(),
  contractAddress: text('contract_address').notNull().unique(),
  adminAddress: text('admin_address').notNull(),
  assetAddress: text('asset_address').notNull(),
  assetSymbol: text('asset_symbol').default('USDC').notNull(),
  status: text('status').default('Active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Treasury Members
export const treasuryMembers = pgTable('treasury_members', {
  id: text('id').primaryKey(),
  treasuryId: text('treasury_id').references(() => treasuries.id).notNull(),
  memberAddress: text('member_address').notNull(),
  role: text('role').notNull(), // Admin | Approver | Spender | Viewer
  status: text('status').default('Active').notNull(),
  addedAt: timestamp('added_at').defaultNow().notNull(),
});

// Spending Policies
export const spendingPolicies = pgTable('spending_policies', {
  id: text('id').primaryKey(),
  treasuryId: text('treasury_id').references(() => treasuries.id).notNull(),
  spenderAddress: text('spender_address').notNull(),
  assetAddress: text('asset_address').notNull(),
  spendingLimitRaw: text('spending_limit_raw').notNull(),
  period: text('period').notNull(), // Daily | Weekly | Monthly
  approvalThresholdRaw: text('approval_threshold_raw').notNull(),
  requiredApprovals: integer('required_approvals').notNull(),
  version: integer('version').default(1).notNull(),
  active: boolean('active').default(true).notNull(),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Payment Requests
export const paymentRequests = pgTable('payment_requests', {
  id: text('id').primaryKey(),
  onChainRequestId: text('on_chain_request_id').notNull(),
  treasuryId: text('treasury_id').references(() => treasuries.id).notNull(),
  spenderAddress: text('spender_address').notNull(),
  recipientAddress: text('recipient_address').notNull(),
  assetAddress: text('asset_address').notNull(),
  amountRaw: text('amount_raw').notNull(),
  amountFormatted: text('amount_formatted').notNull(),
  description: text('description'),
  metadataHash: text('metadata_hash'),
  policyVersion: integer('policy_version').notNull(),
  status: text('status').default('PendingApproval').notNull(),
  approvalCount: integer('approval_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at'),
});

// Payment Approvals
export const paymentApprovals = pgTable('payment_approvals', {
  id: text('id').primaryKey(),
  requestId: text('request_id').references(() => paymentRequests.id).notNull(),
  onChainRequestId: text('on_chain_request_id').notNull(),
  approverAddress: text('approver_address').notNull(),
  txHash: text('tx_hash'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Executed Payments
export const payments = pgTable('payments', {
  id: text('id').primaryKey(),
  requestId: text('request_id').references(() => paymentRequests.id).notNull(),
  onChainRequestId: text('on_chain_request_id').notNull(),
  treasuryId: text('treasury_id').references(() => treasuries.id).notNull(),
  spenderAddress: text('spender_address').notNull(),
  recipientAddress: text('recipient_address').notNull(),
  amountRaw: text('amount_raw').notNull(),
  amountFormatted: text('amount_formatted').notNull(),
  txHash: text('tx_hash').notNull(),
  ledgerSequence: bigint('ledger_sequence', { mode: 'number' }),
  executedAt: timestamp('executed_at').defaultNow().notNull(),
});

// Transactions History
export const transactions = pgTable('transactions', {
  id: text('id').primaryKey(),
  treasuryId: text('treasury_id').references(() => treasuries.id).notNull(),
  txHash: text('tx_hash').notNull().unique(),
  type: text('type').notNull(), // Deposit | Payment | PolicyUpdate | MemberAdd | MemberRemove
  senderAddress: text('sender_address').notNull(),
  recipientAddress: text('recipient_address'),
  assetAddress: text('asset_address').notNull(),
  amountRaw: text('amount_raw').notNull(),
  amountFormatted: text('amount_formatted').notNull(),
  ledgerSequence: bigint('ledger_sequence', { mode: 'number' }),
  status: text('status').default('Confirmed').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Notifications
export const notifications = pgTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  userAddress: text('user_address').notNull(),
  treasuryId: text('treasury_id').references(() => treasuries.id),
  title: text('title').notNull(),
  message: text('message').notNull(),
  type: text('type').default('info').notNull(),
  read: boolean('read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Audit Logs
export const auditLogs = pgTable('audit_logs', {
  id: text('id').primaryKey(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull(),
  action: text('action').notNull(),
  actorAddress: text('actor_address').notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Indexer Checkpoints
export const indexerCheckpoints = pgTable('indexer_checkpoints', {
  id: text('id').primaryKey(),
  contractAddress: text('contract_address').notNull().unique(),
  lastLedger: bigint('last_ledger', { mode: 'number' }).notNull(),
  lastEventId: text('last_event_id'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
