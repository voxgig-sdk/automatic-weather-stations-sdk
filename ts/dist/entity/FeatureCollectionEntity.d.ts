import { AutomaticWeatherStationsEntityBase } from '../AutomaticWeatherStationsEntityBase';
import type { AutomaticWeatherStationsSDK } from '../AutomaticWeatherStationsSDK';
import type { Control } from '../types';
import type { FeatureCollection, FeatureCollectionListMatch } from '../AutomaticWeatherStationsTypes';
declare class FeatureCollectionEntity extends AutomaticWeatherStationsEntityBase<FeatureCollection> {
    constructor(client: AutomaticWeatherStationsSDK, entopts: any);
    make(this: FeatureCollectionEntity): FeatureCollectionEntity;
    list(this: any, reqmatch?: FeatureCollectionListMatch, ctrl?: Control): Promise<FeatureCollectionEntity[]>;
}
export { FeatureCollectionEntity };
