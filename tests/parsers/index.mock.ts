export const getBackendMock = () => ({
  applicationId: "1234-1234",
  applicationType: "primary",
  applicationStatus: "draft",
  applicationVersion: "v1",
  customer: {
    customerId: "1234-1234",
    email: "customer@lease.com",
  },
  property: {
    puCode: "1234-1234",
    slug: "my-property-1234",
    propertyUrl: "https://invh.com/homes/my-property-1234",
    city: "Dallas",
    state: "TX",
    zipcode: "12333",
    address1: "1234 Main St",
    market: {
      slug: "los-angeles-ca",
    },
  },
  formData: {},
  integrationData: {
    files: {
      documents: [
        {
          documentId: "receipt2022-08-11T22:55:29.774Z.pdf",
          type: "receipt",
          tags: [
            {
              Key: "document-display-name",
              Value: "This is my receipt- GA.pdf",
            },
            {
              Key: "document-type",
              Value: "receipt",
            },
          ],
        },
        {
          documentId: "receipt2022-08-11T22:59:57.125Z.jpg",
          type: "receipt",
          tags: [
            {
              Key: "document-display-name",
            },
            {
              Key: "document-type",
              Value: "receipt",
            },
          ],
        },
        {
          documentId: "receipt2022-08-11T22:59:57.125Z.jpg",
          type: "receipt",
          tags: [
            {
              Key: "document-type",
              Value: "receipt",
            },
          ],
        },
      ],
    },
    yardi: {},
  },
  audit: {
    createdAt: "2022-09-08T12:00:00:000Z",
    updatedAt: "2022-09-08T12:00:00:000Z",
  },
  primaryApplicationData: {
    applicationType: "coapplicant",
    firstName: "Walter",
    lastName: "White",
    leaseStartDate: "09/10/2022",
    leaseTerm: "12",
  },
  primaryApplicationId: "4321-4321",
});
