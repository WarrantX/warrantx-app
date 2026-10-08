export class WarrantXClient {
  private apiUrl: string;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl ?? WarrantXClient.defaultApiUrl();
  }

  private static defaultApiUrl(): string {
    if (typeof window !== 'undefined') return '';
    return process.env.WARRANTX_API_URL || 'http://localhost:3001';
  }

  private url(path: string): string {
    return new URL(path, this.apiUrl || window.location.origin).toString();
  }

  async getHealth() {
    const res = await fetch(this.url('/api/v1/health'));
    return res.json();
  }

  async getTreasuries() {
    const res = await fetch(this.url('/api/v1/treasuries'));
    return res.json();
  }

  async getPaymentRequests(treasuryId: string) {
    const url = new URL('/api/v1/payments', this.apiUrl || window.location.origin);
    url.searchParams.set('treasuryId', treasuryId);
    const res = await fetch(url);
    return res.json();
  }
}
