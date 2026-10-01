import { AutomaticWeatherStationsEntityBase } from '../AutomaticWeatherStationsEntityBase';
import type { AutomaticWeatherStationsSDK } from '../AutomaticWeatherStationsSDK';
import type { Control } from '../types';
import type { Item, ItemLoadMatch, ItemListMatch } from '../AutomaticWeatherStationsTypes';
declare class ItemEntity extends AutomaticWeatherStationsEntityBase<Item> {
    constructor(client: AutomaticWeatherStationsSDK, entopts: any);
    make(this: ItemEntity): ItemEntity;
    load(this: any, reqmatch?: ItemLoadMatch, ctrl?: Control): Promise<ItemEntity>;
    list(this: any, reqmatch?: ItemListMatch, ctrl?: Control): Promise<ItemEntity[]>;
}
export { ItemEntity };
