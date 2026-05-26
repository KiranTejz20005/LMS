import { gurukulx, type InferResponseType } from '$lib/utils/services/api';

type ProgramListResponse = InferResponseType<typeof gurukulx.program.$get>;
type ProgramListSuccess = Extract<ProgramListResponse, { success: true }>;
export type Program = ProgramListSuccess['data'][number];

type ProgramResponse = InferResponseType<(typeof gurukulx.program)[':programId']['$get']>;
type ProgramSuccess = Extract<ProgramResponse, { success: true }>;
export type ProgramDetail = ProgramSuccess['data'];

type ProgramMembersResponse = InferResponseType<(typeof gurukulx.program)[':programId']['members']['$get']>;
type ProgramMembersSuccess = Extract<ProgramMembersResponse, { success: true }>;
export type ProgramMember = ProgramMembersSuccess['data'][number];

type ProgramCoursesResponse = InferResponseType<(typeof gurukulx.program)[':programId']['courses']['$get']>;
type ProgramCoursesSuccess = Extract<ProgramCoursesResponse, { success: true }>;
export type ProgramCourse = ProgramCoursesSuccess['data'][number];

export type ListProgramNewsfeedRequest = (typeof gurukulx.program)[':programId']['newsfeed']['$get'];
type ListProgramNewsfeedResponse = InferResponseType<ListProgramNewsfeedRequest>;
type ListProgramNewsfeedSuccess = Extract<ListProgramNewsfeedResponse, { success: true }>;
export type ProgramNewsfeed = ListProgramNewsfeedSuccess['data'];
export type ListProgramNewsfeed = ProgramNewsfeed['items'];
export type ProgramNewsfeedItem = ListProgramNewsfeed[number];

export type CreateProgramNewsfeedRequest = (typeof gurukulx.program)[':programId']['newsfeed']['$post'];
export type UpdateProgramNewsfeedRequest = (typeof gurukulx.program)[':programId']['newsfeed'][':feedId']['$put'];
export type ReactToProgramNewsfeedRequest =
  (typeof gurukulx.program)[':programId']['newsfeed'][':feedId']['react']['$put'];
export type DeleteProgramNewsfeedRequest = (typeof gurukulx.program)[':programId']['newsfeed'][':feedId']['$delete'];

export type GetProgramNewsfeedCommentsRequest =
  (typeof gurukulx.program)[':programId']['newsfeed'][':feedId']['comments']['$get'];
type GetProgramNewsfeedCommentsResponse = InferResponseType<GetProgramNewsfeedCommentsRequest>;
type GetProgramNewsfeedCommentsSuccess = Extract<GetProgramNewsfeedCommentsResponse, { success: true }>;
export type ProgramNewsfeedCommentsResponse = GetProgramNewsfeedCommentsSuccess['data'];
export type ProgramNewsfeedComment = ProgramNewsfeedCommentsResponse[number];

export type CreateProgramNewsfeedCommentRequest =
  (typeof gurukulx.program)[':programId']['newsfeed'][':feedId']['comment']['$post'];
export type DeleteProgramNewsfeedCommentRequest =
  (typeof gurukulx.program)[':programId']['newsfeed'][':feedId']['comment'][':commentId']['$delete'];

// ─── Goals ───────────────────────────────────────────────────────────────────

export type ListProgramGoalsRequest = (typeof gurukulx.program)[':programId']['goals']['$get'];
type ListProgramGoalsResponse = InferResponseType<ListProgramGoalsRequest>;
type ListProgramGoalsSuccess = Extract<ListProgramGoalsResponse, { success: true }>;
export type ProgramGoal = ListProgramGoalsSuccess['data'][number];
export type ProgramGoalStatusCounts = ProgramGoal['statusCounts'];

export type CreateProgramGoalRequest = (typeof gurukulx.program)[':programId']['goals']['$post'];
export type UpdateProgramGoalRequest = (typeof gurukulx.program)[':programId']['goals'][':goalId']['$put'];
export type DeleteProgramGoalRequest = (typeof gurukulx.program)[':programId']['goals'][':goalId']['$delete'];

export type MyGoalsRequest = typeof gurukulx.program.my.goals.$get;
type MyGoalsResponse = InferResponseType<MyGoalsRequest>;
type MyGoalsSuccess = Extract<MyGoalsResponse, { success: true }>;
export type MyGoalAssignment = MyGoalsSuccess['data'][number];

export type GoalsOverviewRequest = typeof gurukulx.program.goals.overview.$get;
type GoalsOverviewResponse = InferResponseType<GoalsOverviewRequest>;
type GoalsOverviewSuccess = Extract<GoalsOverviewResponse, { success: true }>;
export type GoalsOverview = GoalsOverviewSuccess['data'];
export type GoalsOverviewRow = GoalsOverview['goals'][number];
