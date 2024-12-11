import isEqual from "lodash.isequal";

export const hasUnsavedChanges = (
  sectionFormValues: unknown,
  applicationSectionData: unknown
): boolean => {
  return !isEqual(sectionFormValues, applicationSectionData);
};
