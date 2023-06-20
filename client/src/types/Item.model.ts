export interface Item {
    name: string;
    amount?: number;
    date?: string;
    shares?: number;
    price?: number;
    isActive?: boolean;
    handleOpen?: () => void;
}