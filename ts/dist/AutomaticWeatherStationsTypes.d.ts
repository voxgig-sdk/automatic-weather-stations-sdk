export interface Collection {
    href: string;
    rel: string;
    title?: string;
    type?: string;
}
export interface CollectionListMatch {
    href?: string;
    rel?: string;
    title?: string;
    type?: string;
    $action?: string;
    [action: string]: any;
}
export interface FeatureCollection {
    features: any[];
    links?: any[];
    numberMatched?: number;
    numberReturned?: number;
    type: string;
}
export interface FeatureCollectionListMatch {
    bbox?: any[];
    datetime?: string;
    granularity?: string;
    limit?: number;
    station?: string;
    update_frequency?: string;
}
export interface Item {
    geometry: Record<string, any>;
    id?: string;
    links?: any[];
    properties: Record<string, any>;
    type: string;
}
export interface ItemLoadMatch {
    id: string;
}
