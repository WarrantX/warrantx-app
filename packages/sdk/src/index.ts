export class WarrantXClient {
  private apiUrl: string;

  constructor(apiUrl = 'http://localhost:3001') {
    this.apiUrl = apiUrl;
  }

  async getHealth() {
    const res = await fetch(`${this.apiUrl}/api/v1/health`);
    return res.json();
  }

  async getTreasuries() {
    const res = await fetch(`${this.apiUrl}/api/v1/treasuries`);
    return res.json();
  }

  async getPaymentRequests(treasuryId: string) {
    const res = await fetch(`${this.apiUrl}/api/v1/payments?treasuryId=${treasuryId}`);
    return res.json();
  }
}
