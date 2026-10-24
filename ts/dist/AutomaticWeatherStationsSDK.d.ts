import { CollectionEntity } from './entity/CollectionEntity';
import { ItemEntity } from './entity/ItemEntity';
export type * from './AutomaticWeatherStationsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AutomaticWeatherStationsEntityBase } from './AutomaticWeatherStationsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class AutomaticWeatherStationsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Collection(entopts?: Record<string, any>): CollectionEntity;
    Item(entopts?: Record<string, any>): ItemEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AutomaticWeatherStationsSDK;
    tester(testopts?: any, sdkopts?: any): AutomaticWeatherStationsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AutomaticWeatherStationsSDK;
export { stdutil, config, BaseFeature, AutomaticWeatherStationsEntityBase, AutomaticWeatherStationsSDK, SDK, };
export type { DirectResult };
