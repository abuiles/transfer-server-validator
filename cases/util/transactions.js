import { fetch } from "./fetchShim";
import FormData from "form-data";

export async function createTransaction({ currency, account, toml, jwt, isDeposit }) {
    const params = new FormData();
    if (currency) params.append("asset_code", currency);
    if (account) params.append("account", account);

    const headers = Object.assign(
        { Authorization: `Bearer ${jwt}`},
        params.getHeaders()
    );

    const transactionsUrl = toml.TRANSFER_SERVER + `/transactions/${isDeposit ? 'deposit' : 'withdraw'}/interactive`;
    const response = await fetch(
        transactionsUrl, {
            headers,
            method: "POST",
            body: params
        }
    );

    const status = response.status;
    const json = await response.json();

    return {
        status,
        json
    };
};