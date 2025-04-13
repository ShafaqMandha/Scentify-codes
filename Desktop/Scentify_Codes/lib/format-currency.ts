/**
 * Formats a number as AED currency
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return `${amount.toFixed(2)} AED`
}

