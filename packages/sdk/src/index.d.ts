export declare class WarrantXClient {
    private apiUrl;
    constructor(apiUrl?: string);
    getHealth(): Promise<any>;
    getTreasuries(): Promise<any>;
    getPaymentRequests(treasuryId: string): Promise<any>;
}
