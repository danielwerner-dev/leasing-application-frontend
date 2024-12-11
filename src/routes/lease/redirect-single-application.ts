import {
  ApplicationStatus,
  ApplicationType,
  FrontendApplication,
} from "$lib/types/FrontendApplication.type";
import {
  getApplicationUrl,
  getDashboardUrl,
  getNoRedirectUrl,
  getPropertyDetailsUrl,
  GetRedirectUrl,
} from "$lib/utils/redirect-urls/redirects";

type MarketStatus = "offTheMarket" | "onTheMarket";
type MarketsRedirectMap = Record<MarketStatus, GetRedirectUrl>;
type StatusRedirectMap = Record<ApplicationStatus, MarketsRedirectMap>;
type RedirectMap = Record<ApplicationType, StatusRedirectMap>;

const createdRedirects: MarketsRedirectMap = {
  onTheMarket: getNoRedirectUrl,
  offTheMarket: getNoRedirectUrl,
};

const pendingRedirects: MarketsRedirectMap = {
  onTheMarket: getNoRedirectUrl,
  offTheMarket: getDashboardUrl,
};

const completedRedirects: MarketsRedirectMap = {
  onTheMarket: getNoRedirectUrl,
  offTheMarket: getPropertyDetailsUrl,
};

const createdPendingAndCompletedRedirects: Pick<
  StatusRedirectMap,
  | ApplicationStatus.created
  | ApplicationStatus.pending
  | ApplicationStatus.approved
  | ApplicationStatus.denied
  | ApplicationStatus.deleted
  | ApplicationStatus.canceled
> = {
  created: createdRedirects,
  pending: pendingRedirects,
  approved: completedRedirects,
  denied: completedRedirects,
  deleted: completedRedirects,
  canceled: completedRedirects,
};

const redirectMap: RedirectMap = {
  primary: {
    ...createdPendingAndCompletedRedirects,
    draft: {
      onTheMarket: getApplicationUrl,
      offTheMarket: getPropertyDetailsUrl,
    },
  },
  coapplicant: {
    ...createdPendingAndCompletedRedirects,
    draft: {
      onTheMarket: getApplicationUrl,
      offTheMarket: getApplicationUrl,
    },
  },
};

export const getSingleApplicationRedirectUrl = (
  application: FrontendApplication,
  isSyndicated: boolean
): string | undefined => {
  const { applicationType: type, applicationStatus: status } = application;
  const marketStatus: MarketStatus = isSyndicated
    ? "onTheMarket"
    : "offTheMarket";

  const typeValid = Object.values(ApplicationType).includes(type);
  const statusValid = Object.values(ApplicationStatus).includes(status);

  if (!typeValid || !statusValid) {
    throw new Error("Invalid application type or status");
  }

  const hasGuestCard = Boolean(application.integrationData?.yardi?.guestcardId);

  if (
    application.applicationStatus === ApplicationStatus.draft &&
    application.applicationType === ApplicationType.PRIMARY &&
    !isSyndicated &&
    hasGuestCard
  ) {
    const applicationUrl = getApplicationUrl(application);
    return applicationUrl;
  }

  return redirectMap[type][status][marketStatus](application);
};
