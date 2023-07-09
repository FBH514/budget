const PORT = 8000;
const HOST = `http://localhost:${PORT}`;
const NAME = 'budget';
const VERSION = 'v1';

const HEADERS = {
    "Content-Type": "application/json"
};

export async function GET(endpoint: string): Promise<any> {
    const response = await fetch(endpoint);
    return await response.json();
}

export async function POST(endpoint: string, data: unknown): Promise<unknown> {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function PUT(endpoint: string, data: unknown): Promise<unknown> {
    const response = await fetch(endpoint, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function DELETE(endpoint: string): Promise<unknown> {
    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: HEADERS
    });
    return await response.json();
}

export enum Endpoints {
    INCOME = `${HOST}/${NAME}/${VERSION}/income/`,
    INVESTMENTS = `${HOST}/${NAME}/${VERSION}/investments/`,
    EXPENSES = `${HOST}/${NAME}/${VERSION}/expenses/`,
    ADD_ENTRY = `${HOST}/${NAME}/${VERSION}/add-entry/`,
    UPDATE_ENTRY = `${HOST}/${NAME}/${VERSION}/update-entry/`
}

export enum QueryKeys {
    INCOME = "INCOME",
    INVESTMENTS = "INVESTMENTS",
    EXPENSES = "EXPENSES"
}