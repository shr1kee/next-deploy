export interface IActor {
    id: string;
    name: string;
    category: string;
    year: number | null;
    createdAt?: Date;
    updatedAt?: Date;

}