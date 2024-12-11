import {
  ApplicationStatus,
  FrontendApplication,
} from "$lib/types/FrontendApplication.type";
import {
  getDashboardUrl,
  getNoRedirectUrl,
  getPropertyDetailsUrl,
} from "$lib/utils/redirect-urls/redirects";

const pendingOrDraft = [ApplicationStatus.draft, ApplicationStatus.pending];
const pendingOrDraftFinder = ({ applicationStatus }: FrontendApplication) =>
  pendingOrDraft.includes(applicationStatus);

export const getMultipleApplicationsRedirectUrl = (
  applications: FrontendApplication[],
  isSyndicated: boolean
): string | undefined => {
  if (applications.find(pendingOrDraftFinder)) {
    return getDashboardUrl();
  }

  if (!isSyndicated) {
    return getPropertyDetailsUrl(applications[0]);
  }

  return getNoRedirectUrl();
};
