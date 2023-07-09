export interface Item {
    id: number;
    name: string;
    amount?: number;
    date?: string;
    shares?: number;
    price?: number;
    isActive?: boolean;
    handleOpen?: () => void;
}