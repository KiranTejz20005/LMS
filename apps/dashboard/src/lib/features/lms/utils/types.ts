import { gurukulx, type InferResponseType } from '$lib/utils/services/api';

export type GetPendingOrgInviteRequest = (typeof gurukulx.invite.organization)['pending']['$get'];
type GetPendingOrgInviteResponse = Extract<InferResponseType<GetPendingOrgInviteRequest>, { success: true }>;
export type PendingOrgInvite = NonNullable<GetPendingOrgInviteResponse['data']>;
