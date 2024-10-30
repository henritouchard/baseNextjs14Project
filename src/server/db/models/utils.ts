export function getEnumValues<T extends Record<string, string>>(
  enumObj: T
): [string, ...string[]] {
  return Object.values(enumObj) as [string, ...string[]]
}
