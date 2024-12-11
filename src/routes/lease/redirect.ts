import {
  FrontendApplication,
  FrontendProperty,
} from "$lib/types/FrontendApplication.type";
import {
  getNoRedirectUrl,
  getPropertyDetailsUrl,
} from "$lib/utils/redirect-urls/redirects";

import { getMultipleApplicationsRedirectUrl } from "./redirect-multiple-applications";
import { getSingleApplicationRedirectUrl } from "./redirect-single-application";

export const getRedirectUrl = (
  applications: FrontendApplication[],
  { isSyndicated, slug }: FrontendProperty
): string | undefined => {
  const newApplication = applications.length === 0;
  const multipleApplications = applications.length > 1;

  if (newApplication) {
    if (!isSyndicated) {
      return getPropertyDetailsUrl({
        property: { slug },
      } as FrontendApplication);
    }

    return getNoRedirectUrl();
  }

  if (multipleApplications) {
    return getMultipleApplicationsRedirectUrl(applications, isSyndicated);
  }

  return getSingleApplicationRedirectUrl(applications[0], isSyndicated);
};
