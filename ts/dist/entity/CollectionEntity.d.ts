import { AutomaticWeatherStationsEntityBase } from '../AutomaticWeatherStationsEntityBase';
import type { AutomaticWeatherStationsSDK } from '../AutomaticWeatherStationsSDK';
import type { Control } from '../types';
import type { Collection, CollectionListMatch } from '../AutomaticWeatherStationsTypes';
declare class CollectionEntity extends AutomaticWeatherStationsEntityBase<Collection> {
    constructor(client: AutomaticWeatherStationsSDK, entopts: any);
    make(this: CollectionEntity): CollectionEntity;
    list(this: any, reqmatch?: CollectionListMatch, ctrl?: Control): Promise<CollectionEntity[]>;
}
export { CollectionEntity };
