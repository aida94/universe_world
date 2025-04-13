/**
 * Generates a consistent numeric ID from a string (between 1 and 10000)s
 */
export function generateIdFromString(name: string): number {
  const hash = Array.from(name.toLowerCase())
    .reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0), 0)
  return Math.abs(hash % 10000) + 1
}
