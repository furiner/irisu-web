import { Account } from "../structures/Account";
import { APIResponseError } from "./errors/APIResponseError";

export class RestClient {
    public account: Account;

    constructor(account: Account) {
        this.account = account;
    }

    /**
     * Wraps around the Fetch API to send a request.
    */
    public async request(url: string, request: RequestInit): Promise<any> {
        const response = await fetch(url, request);

        // Handle status codes
        if (response.status == 200) {
            if (response.headers.get("Content-Type")?.startsWith("application/json")) {
                return await response.json();
            } else {
                return await response.text();
            }
        } else if (response.status >= 500) {
            throw new APIResponseError(response.status, "A potential internal error has occured.", await response.text());
        } else {
            let data;
            if (response.headers.get("Content-Type")?.startsWith("application/json")) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            throw new APIResponseError(response.status, data?.message ?? data);
        }
    }
}