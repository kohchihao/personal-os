export const formatCurrency = (amount: number, isPrivacyMode = false) => {
  if (isPrivacyMode) {
    return '****';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
