import { z } from 'zod';

export const MemberRoleSchema = z.enum(['Admin', 'Approver', 'Spender', 'Viewer']);
export type MemberRole = z.infer<typeof MemberRoleSchema>;

export const MemberStatusSchema = z.enum(['Active', 'Suspended']);
export type MemberStatus = z.infer<typeof MemberStatusSchema>;

export const SpendingPeriodSchema = z.enum(['Daily', 'Weekly', 'Monthly']);
export type SpendingPeriod = z.infer<typeof SpendingPeriodSchema>;

export const TreasuryStatusSchema = z.enum(['Active', 'Suspended', 'Closed']);
export type TreasuryStatus = z.infer<typeof TreasuryStatusSchema>;

export const PaymentStatusSchema = z.enum([
  'Draft',
  'Submitted',
  'PendingApproval',
  'Approved',
  'Executing',
  'Executed',
  'Rejected',
  'Cancelled',
  'Expired',
  'Failed',
]);
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

// Treasury Creation Schema
export const CreateTreasurySchema = z.object({
  name: z.string().min(2).max(100),
  orgId: z.string().min(2).max(50),
  assetAddress: z.string().min(50).max(56),
  adminAddress: z.string().min(56).max(56),
});
export type CreateTreasuryInput = z.infer<typeof CreateTreasurySchema>;

// Member Schema
export const AddMemberSchema = z.object({
  treasuryId: z.string(),
  memberAddress: z.string().min(56).max(56),
  role: MemberRoleSchema,
});
export type AddMemberInput = z.infer<typeof AddMemberSchema>;

// Policy Schema
export const CreatePolicySchema = z.object({
  treasuryId: z.string(),
  spenderAddress: z.string().min(56).max(56),
  assetAddress: z.string().min(50).max(56),
  spendingLimit: z.string().regex(/^\d+(\.\d+)?$/, 'Must be a valid positive number'),
  period: SpendingPeriodSchema,
  approvalThreshold: z.string().regex(/^\d+(\.\d+)?$/, 'Must be a valid positive number'),
  requiredApprovals: z.number().int().min(0).max(10),
  expiresAt: z.number().optional().default(0),
});
export type CreatePolicyInput = z.infer<typeof CreatePolicySchema>;

// Payment Request Schema
export const CreatePaymentRequestSchema = z.object({
  treasuryId: z.string(),
  recipientAddress: z.string().min(56).max(56),
  assetAddress: z.string().min(50).max(56),
  amount: z.string().regex(/^\d+(\.\d+)?$/, 'Must be a valid positive token amount'),
  description: z.string().max(500),
  expiresInSeconds: z.number().int().min(0).default(86400), // Default 24 hrs
});
export type CreatePaymentRequestInput = z.infer<typeof CreatePaymentRequestSchema>;

// Wallet Challenge Auth Schema
export const ChallengeRequestSchema = z.object({
  publicKey: z.string().min(56).max(56),
});
export type ChallengeRequestInput = z.infer<typeof ChallengeRequestSchema>;

export const ChallengeVerifySchema = z.object({
  publicKey: z.string().min(56).max(56),
  challenge: z.string(),
  signature: z.string(),
});
export type ChallengeVerifyInput = z.infer<typeof ChallengeVerifySchema>;
