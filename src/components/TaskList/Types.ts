export interface Filters {
    id: number;
    title: string;
    description: string;
    status: string;
    offset: number;
    limit: number;
    sortBy: string;
    [key: string]: string | number;
}

export type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
    [key: string]: any;
}

export type Option = {
    value: string;
    name: string;
    type: string;
}
