import { gurukulx, type InferResponseType } from '$lib/utils/services/api';

export type GetUsageRequest = typeof gurukulx.agent.usage.$get;
export type GetPurchasedRequest = (typeof gurukulx.agent.usage)['purchased']['$get'];
export type GetLeaderboardRequest = (typeof gurukulx.agent.usage)['leaderboard']['$get'];

type GetUsageSuccess = Extract<InferResponseType<GetUsageRequest>, { success: true }>;
type GetPurchasedSuccess = Extract<InferResponseType<GetPurchasedRequest>, { success: true }>;
type GetLeaderboardSuccess = Extract<InferResponseType<GetLeaderboardRequest>, { success: true }>;

export type AiUsageData = GetUsageSuccess['data'];
export type PurchasedSummaryData = GetPurchasedSuccess['data'];
export type LeaderboardData = GetLeaderboardSuccess['data'];
export type LeaderboardEntry = LeaderboardData['entries'][number];
