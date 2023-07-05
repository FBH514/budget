export async function GET(endpoint: string): Promise<any> {
    const response = await fetch(endpoint);
    return await response.json();
}

export async function POST(endpoint: string, data: unknown): Promise<unknown> {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export enum Endpoints {
    INCOME = "http://localhost:8000/budget/income/",
    INVESTMENTS = "http://localhost:8000/budget/investments/",
    EXPENSES = "http://localhost:8000/budget/expenses/",
    ADD_ENTRY = "http://localhost:8000/budget/add-entry/"
}

export enum QueryKeys {
    INCOME = "INCOME",
    INVESTMENTS = "INVESTMENTS",
    EXPENSES = "EXPENSES"
}