import type { FrontendDependent } from "$lib/types/form-data/frontend/FrontendPersonalDetails.type";

import { olderThanEighteen } from "./date";

export const hasOverEighteen = (dependents: FrontendDependent[]): boolean => {
  const overEighteen = dependents.filter((dependent) => {
    const { dateOfBirth } = dependent;
    if (!dateOfBirth) {
      return false;
    }

    return olderThanEighteen(dateOfBirth);
  });

  return Boolean(overEighteen.length);
};
