"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarrantXClient = void 0;
class WarrantXClient {
    apiUrl;
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
    async getPaymentRequests(treasuryId) {
        const res = await fetch(`${this.apiUrl}/api/v1/payments?treasuryId=${treasuryId}`);
        return res.json();
    }
}
exports.WarrantXClient = WarrantXClient;
