import { error, redirect, type RequestEvent } from "@sveltejs/kit";

import CustomerService from "$lib/connectors/customer-service";
import LeasingApplicationService from "$lib/connectors/leasing-application-service";
import PropertyService from "$lib/connectors/pls";
import { authorize } from "$lib/request-handlers/shared/authorize";
import logger from "$lib/utils/logger";

import { getRedirectUrl } from "./redirect";

export const load = async (event: RequestEvent) => {
  const slug = event.url.searchParams.get("property");

  if (!slug) {
    throw error(400, "Invalid property");
  }

  logger.info(`Loading application for property: ${slug}`);

  const { customerId, idToken } = authorize(event, slug);

  logger.info(`Access granted for customer ${customerId}`);

  const [property, applications = [], customer] = await Promise.all([
    PropertyService.getProperty(slug),
    LeasingApplicationService.listApplications(customerId, idToken),
    CustomerService.getCustomer(customerId, idToken),
  ]);

  if (!property) {
    throw error(400, "Invalid property");
  }

  if (!customer) {
    throw error(400, "Invalid customer");
  }

  const backendApplications = applications.filter(
    (application) => application.property.puCode === property.puCode
  );

  const frontendApplications = backendApplications.map(
    (application) => application
  );
  const redirectUrl = getRedirectUrl(frontendApplications, property);
  if (redirectUrl) {
    throw redirect(302, redirectUrl);
  }

  logger.info(`Returning apply payload for customer ${customer.id}`, {
    property,
  });

  return {
    customer: {
      customerId: customer.id,
      email: customer.email,
    },
    property,
  };
};
