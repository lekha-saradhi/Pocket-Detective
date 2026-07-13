
export function extractUrls(text: string): string[] {
  const regex =
    /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;

  const matches = text.match(regex);

  return matches ?? [];
}