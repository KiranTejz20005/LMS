import { gurukulx, type InferResponseType } from '$lib/utils/services/api';

export type GetCommunityQuestionsRequest = typeof gurukulx.community.$get;
export type CommunityQuestionsResponse = InferResponseType<GetCommunityQuestionsRequest> | null;
export type CommunityQuestionsSuccess = Extract<InferResponseType<GetCommunityQuestionsRequest>, { success: true }>;
export type CommunityQuestionData = CommunityQuestionsSuccess['data'];

export type GetCommunityQuestionRequest = (typeof gurukulx.community)[':slug']['$get'];
export type CommunityQuestionResponse = InferResponseType<GetCommunityQuestionRequest> | null;
export type CommunityQuestionSuccess = Extract<InferResponseType<GetCommunityQuestionRequest>, { success: true }>;

export type CreateCommentRequest = typeof gurukulx.community.$post;
export type CreateCommentSuccess = Extract<InferResponseType<CreateCommentRequest>, { success: true }>;
export type CreateCommentData = CreateCommentSuccess['data'];

export type UpvotePostRequest = (typeof gurukulx.community)[':id']['upvote']['$post'];
export type UpvotePostSuccess = Extract<InferResponseType<UpvotePostRequest>, { success: true }>;
export type UpvotePostData = UpvotePostSuccess['data'];

export type CreateCommunityQuestionRequest = typeof gurukulx.community.$post;
export type CreateCommunityQuestionSuccess = Extract<
  InferResponseType<CreateCommunityQuestionRequest>,
  { success: true }
>;
export type UpdateQuestionRequest = (typeof gurukulx.community)[':id']['$put'];
export type UpdateQuestionSuccess = Extract<InferResponseType<UpdateQuestionRequest>, { success: true }>;
export type UpdateQuestionData = UpdateQuestionSuccess['data'];
