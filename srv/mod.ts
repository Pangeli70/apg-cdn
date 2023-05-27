/** -----------------------------------------------------------------------
 * @module [apg-cdn]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.7 [APG 2023/04/25] Separation of concerns lib/srv
 * ------------------------------------------------------------------------
*/
import { Edr } from "./deps.ts";

import { ApgCdnHomeResource } from "./resources/ApgCdnHomeResource.ts";
import { ApgCdnTypeResource } from "./resources/ApgCdnTypeResource.ts";


export const ApgCdnServices: Edr.Drash.Service[] = [
    new Edr.Drash.CORSService(),
    new Edr.ApgEdrEveryReqService(),
    new Edr.ApgEdrLoggableService(),
];

export const ApgCdnResources: typeof Edr.Drash.Resource[] = [

    // Static
    Edr.ApgEdrAssetBinFileResource,
    Edr.ApgEdrAssetsTextFileResource,

    // Cdn
    ApgCdnHomeResource,
    ApgCdnTypeResource,

];
