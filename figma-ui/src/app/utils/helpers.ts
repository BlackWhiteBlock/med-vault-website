/**
 * Format date to Chinese locale
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format date to short format
 */
export function formatDateShort(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("zh-CN");
}

/**
 * Check if date is expired
 */
export function isExpired(expiryDate: string | Date): boolean {
  const d = typeof expiryDate === "string" ? new Date(expiryDate) : expiryDate;
  return d < new Date();
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Mask phone number
 */
export function maskPhone(phone: string): string {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

/**
 * Calculate days until expiry
 */
export function daysUntilExpiry(expiryDate: string | Date): number {
  const d = typeof expiryDate === "string" ? new Date(expiryDate) : expiryDate;
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
