import { redirect } from "@sveltejs/kit";

import {
  ApplicationStatus,
  ApplicationType,
} from "$lib/types/FrontendApplication.type";
import { getDashboardUrl } from "$lib/utils/redirect-urls/redirects";

export const authorizeManageRoute = (
  applicationType: ApplicationType,
  applicationStatus: string
) => {
  if (
    !(
      applicationType === ApplicationType.PRIMARY &&
      applicationStatus === ApplicationStatus.pending
    )
  ) {
    throw redirect(302, getDashboardUrl() as string);
  }
};
