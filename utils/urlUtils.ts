const baseUrl = 'https://www.chess.com';

export function buildChessUrl(path: string): string {
  return new URL(path, baseUrl).toString();
}
