import { gurukulx, type InferResponseType } from '$lib/utils/services/api';

export type AccountResponse = InferResponseType<typeof gurukulx.account.$get> | null;

export type AccountSuccess = Extract<InferResponseType<typeof gurukulx.account.$get>, { success: true }>;

export type AccountOrg = AccountSuccess['organizations'][number];
