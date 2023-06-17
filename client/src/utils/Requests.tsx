async function GET(endpoint: string): Promise<any> {
    const response = await fetch(endpoint);
    return await response.json();
}