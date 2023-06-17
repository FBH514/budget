export async function GET(endpoint: string): Promise<any> {
    const response = await fetch(endpoint);
    return await response.json();
}

export enum Endpoints {
    INCOME = "http://localhost:8000/budget/income/",
    INVESTMENTS = "http://localhost:8000/budget/investments/",
    EXPENSES = "http://localhost:8000/budget/expenses/"
}

export enum QueryKeys {
    INCOME = "INCOME",
    INVESTMENTS = "INVESTMENTS",
    EXPENSES = "EXPENSES"
}