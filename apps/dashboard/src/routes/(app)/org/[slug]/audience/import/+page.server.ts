import { gurukulx, getApiHeaders, type InferResponseType } from '$lib/utils/services/api';
import { safeServerApi } from '$lib/utils/services/api/server';

type GetOrganizationCoursesRequest = typeof gurukulx.organization.courses.$get;
type GetOrganizationCoursesSuccess = Extract<InferResponseType<GetOrganizationCoursesRequest>, { success: true }>;

type GetProgramsRequest = typeof gurukulx.program.$get;
type GetProgramsSuccess = Extract<InferResponseType<GetProgramsRequest>, { success: true }>;

export const load = async ({ parent, cookies }) => {
  const { orgId } = await parent();

  if (!orgId) {
    return {
      courses: [],
      programs: []
    };
  }

  const [coursesResult, programsResult] = await Promise.all([
    safeServerApi<GetOrganizationCoursesSuccess>(() =>
      gurukulx.organization.courses.$get({ query: {} }, getApiHeaders(cookies, orgId))
    ),
    safeServerApi<GetProgramsSuccess>(() =>
      gurukulx.program.$get({ query: { organizationId: orgId } }, getApiHeaders(cookies, orgId))
    )
  ]);

  return {
    courses: coursesResult.ok ? coursesResult.body.data : [],
    programs: programsResult.ok ? programsResult.body.data : []
  };
};
