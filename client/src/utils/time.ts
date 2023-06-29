export const getMonth = (): string => {
    return new Date().toLocaleDateString('en-US', { month: 'long' });
}