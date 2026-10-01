export interface Collection {
}
export interface CollectionListMatch {
    $action?: string;
    [action: string]: any;
}
export interface Item {
    features: any[];
    geometry: Record<string, any>;
    id?: string;
    links?: any[];
    numberMatched?: number;
    numberReturned?: number;
    properties: Record<string, any>;
    type: string;
}
export interface ItemLoadMatch {
    id: string;
}
export interface ItemListMatch {
    bbox?: any[];
    datetime?: string;
    granularity?: string;
    limit?: number;
    station?: string;
    update_frequency?: string;
}
