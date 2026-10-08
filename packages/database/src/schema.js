"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexerCheckpoints = exports.auditLogs = exports.notifications = exports.transactions = exports.payments = exports.paymentApprovals = exports.paymentRequests = exports.spendingPolicies = exports.treasuryMembers = exports.treasuries = exports.organizationMembers = exports.organizations = exports.sessions = exports.userWallets = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// Users
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    email: (0, pg_core_1.text)('email'),
    publicKey: (0, pg_core_1.text)('public_key').notNull().unique(),
    role: (0, pg_core_1.text)('role').default('user').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
// User Wallets
exports.userWallets = (0, pg_core_1.pgTable)('user_wallets', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    userId: (0, pg_core_1.text)('user_id').references(() => exports.users.id).notNull(),
    publicKey: (0, pg_core_1.text)('public_key').notNull(),
    label: (0, pg_core_1.text)('label'),
    isPrimary: (0, pg_core_1.boolean)('is_primary').default(false).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
// Sessions
exports.sessions = (0, pg_core_1.pgTable)('sessions', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    userId: (0, pg_core_1.text)('user_id').references(() => exports.users.id).notNull(),
    token: (0, pg_core_1.text)('token').notNull().unique(),
    expiresAt: (0, pg_core_1.timestamp)('expires_at').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
// Organizations
exports.organizations = (0, pg_core_1.pgTable)('organizations', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    orgCode: (0, pg_core_1.text)('org_code').notNull().unique(),
    ownerId: (0, pg_core_1.text)('owner_id').references(() => exports.users.id).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
// Organization Members
exports.organizationMembers = (0, pg_core_1.pgTable)('organization_members', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    orgId: (0, pg_core_1.text)('org_id').references(() => exports.organizations.id).notNull(),
    userId: (0, pg_core_1.text)('user_id').references(() => exports.users.id).notNull(),
    role: (0, pg_core_1.text)('role').default('member').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
// Treasuries
exports.treasuries = (0, pg_core_1.pgTable)('treasuries', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    orgId: (0, pg_core_1.text)('org_id').references(() => exports.organizations.id).notNull(),
    name: (0, pg_core_1.text)('name').notNull(),
    contractAddress: (0, pg_core_1.text)('contract_address').notNull().unique(),
    adminAddress: (0, pg_core_1.text)('admin_address').notNull(),
    assetAddress: (0, pg_core_1.text)('asset_address').notNull(),
    assetSymbol: (0, pg_core_1.text)('asset_symbol').default('USDC').notNull(),
    status: (0, pg_core_1.text)('status').default('Active').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
// Treasury Members
exports.treasuryMembers = (0, pg_core_1.pgTable)('treasury_members', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    treasuryId: (0, pg_core_1.text)('treasury_id').references(() => exports.treasuries.id).notNull(),
    memberAddress: (0, pg_core_1.text)('member_address').notNull(),
    role: (0, pg_core_1.text)('role').notNull(), // Admin | Approver | Spender | Viewer
    status: (0, pg_core_1.text)('status').default('Active').notNull(),
    addedAt: (0, pg_core_1.timestamp)('added_at').defaultNow().notNull(),
});
// Spending Policies
exports.spendingPolicies = (0, pg_core_1.pgTable)('spending_policies', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    treasuryId: (0, pg_core_1.text)('treasury_id').references(() => exports.treasuries.id).notNull(),
    spenderAddress: (0, pg_core_1.text)('spender_address').notNull(),
    assetAddress: (0, pg_core_1.text)('asset_address').notNull(),
    spendingLimitRaw: (0, pg_core_1.text)('spending_limit_raw').notNull(),
    period: (0, pg_core_1.text)('period').notNull(), // Daily | Weekly | Monthly
    approvalThresholdRaw: (0, pg_core_1.text)('approval_threshold_raw').notNull(),
    requiredApprovals: (0, pg_core_1.integer)('required_approvals').notNull(),
    version: (0, pg_core_1.integer)('version').default(1).notNull(),
    active: (0, pg_core_1.boolean)('active').default(true).notNull(),
    expiresAt: (0, pg_core_1.timestamp)('expires_at'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
// Payment Requests
exports.paymentRequests = (0, pg_core_1.pgTable)('payment_requests', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    onChainRequestId: (0, pg_core_1.text)('on_chain_request_id').notNull(),
    treasuryId: (0, pg_core_1.text)('treasury_id').references(() => exports.treasuries.id).notNull(),
    spenderAddress: (0, pg_core_1.text)('spender_address').notNull(),
    recipientAddress: (0, pg_core_1.text)('recipient_address').notNull(),
    assetAddress: (0, pg_core_1.text)('asset_address').notNull(),
    amountRaw: (0, pg_core_1.text)('amount_raw').notNull(),
    amountFormatted: (0, pg_core_1.text)('amount_formatted').notNull(),
    description: (0, pg_core_1.text)('description'),
    metadataHash: (0, pg_core_1.text)('metadata_hash'),
    policyVersion: (0, pg_core_1.integer)('policy_version').notNull(),
    status: (0, pg_core_1.text)('status').default('PendingApproval').notNull(),
    approvalCount: (0, pg_core_1.integer)('approval_count').default(0).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    expiresAt: (0, pg_core_1.timestamp)('expires_at'),
});
// Payment Approvals
exports.paymentApprovals = (0, pg_core_1.pgTable)('payment_approvals', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    requestId: (0, pg_core_1.text)('request_id').references(() => exports.paymentRequests.id).notNull(),
    onChainRequestId: (0, pg_core_1.text)('on_chain_request_id').notNull(),
    approverAddress: (0, pg_core_1.text)('approver_address').notNull(),
    txHash: (0, pg_core_1.text)('tx_hash'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
// Executed Payments
exports.payments = (0, pg_core_1.pgTable)('payments', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    requestId: (0, pg_core_1.text)('request_id').references(() => exports.paymentRequests.id).notNull(),
    onChainRequestId: (0, pg_core_1.text)('on_chain_request_id').notNull(),
    treasuryId: (0, pg_core_1.text)('treasury_id').references(() => exports.treasuries.id).notNull(),
    spenderAddress: (0, pg_core_1.text)('spender_address').notNull(),
    recipientAddress: (0, pg_core_1.text)('recipient_address').notNull(),
    amountRaw: (0, pg_core_1.text)('amount_raw').notNull(),
    amountFormatted: (0, pg_core_1.text)('amount_formatted').notNull(),
    txHash: (0, pg_core_1.text)('tx_hash').notNull(),
    ledgerSequence: (0, pg_core_1.bigint)('ledger_sequence', { mode: 'number' }),
    executedAt: (0, pg_core_1.timestamp)('executed_at').defaultNow().notNull(),
});
// Transactions History
exports.transactions = (0, pg_core_1.pgTable)('transactions', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    treasuryId: (0, pg_core_1.text)('treasury_id').references(() => exports.treasuries.id).notNull(),
    txHash: (0, pg_core_1.text)('tx_hash').notNull().unique(),
    type: (0, pg_core_1.text)('type').notNull(), // Deposit | Payment | PolicyUpdate | MemberAdd | MemberRemove
    senderAddress: (0, pg_core_1.text)('sender_address').notNull(),
    recipientAddress: (0, pg_core_1.text)('recipient_address'),
    assetAddress: (0, pg_core_1.text)('asset_address').notNull(),
    amountRaw: (0, pg_core_1.text)('amount_raw').notNull(),
    amountFormatted: (0, pg_core_1.text)('amount_formatted').notNull(),
    ledgerSequence: (0, pg_core_1.bigint)('ledger_sequence', { mode: 'number' }),
    status: (0, pg_core_1.text)('status').default('Confirmed').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
// Notifications
exports.notifications = (0, pg_core_1.pgTable)('notifications', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    userId: (0, pg_core_1.text)('user_id').references(() => exports.users.id),
    userAddress: (0, pg_core_1.text)('user_address').notNull(),
    treasuryId: (0, pg_core_1.text)('treasury_id').references(() => exports.treasuries.id),
    title: (0, pg_core_1.text)('title').notNull(),
    message: (0, pg_core_1.text)('message').notNull(),
    type: (0, pg_core_1.text)('type').default('info').notNull(),
    read: (0, pg_core_1.boolean)('read').default(false).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
// Audit Logs
exports.auditLogs = (0, pg_core_1.pgTable)('audit_logs', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    entityType: (0, pg_core_1.text)('entity_type').notNull(),
    entityId: (0, pg_core_1.text)('entity_id').notNull(),
    action: (0, pg_core_1.text)('action').notNull(),
    actorAddress: (0, pg_core_1.text)('actor_address').notNull(),
    metadata: (0, pg_core_1.jsonb)('metadata'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
// Indexer Checkpoints
exports.indexerCheckpoints = (0, pg_core_1.pgTable)('indexer_checkpoints', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    contractAddress: (0, pg_core_1.text)('contract_address').notNull().unique(),
    lastLedger: (0, pg_core_1.bigint)('last_ledger', { mode: 'number' }).notNull(),
    lastEventId: (0, pg_core_1.text)('last_event_id'),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
