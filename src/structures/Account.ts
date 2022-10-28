import { RestClient } from "../util/RestClient";

export class Account {
    public rest: RestClient;
    public loggedIn: boolean;

    constructor() {
        this.rest = new RestClient(this);
        this.loggedIn = false;
    }
}