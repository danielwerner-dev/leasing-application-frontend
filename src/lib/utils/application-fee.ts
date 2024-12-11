const DEFAULT_FEE = 50;

const feesMap: Record<string, number> = {
  "los-angeles-ca": 45,
  "sacramento-ca": 45,
};

export const getApplicationFee = (marketSlug: string) => {
  return feesMap[marketSlug] || DEFAULT_FEE;
};
