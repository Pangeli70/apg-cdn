/** -----------------------------------------------------------------------
 * @module [Cdn/srv]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.7 [APG 2023/04/25] Separation of concerns lib/srv
 * ------------------------------------------------------------------------
*/
import { Drash } from "./deps.ts";
import { Edr } from "./deps.ts";

import { ApgCdnHomeResource } from "./resources/ApgCdnHomeResource.ts";
import { ApgCdnTypeResource } from "./resources/ApgCdnTypeResource.ts";


export const ApgCdnResources: typeof Drash.Resource[] = [

    // Static
    Edr.ApgEdrAssetBinFileResource,
    Edr.ApgEdrAssetsTextFileResource,

    // Cdn
    ApgCdnHomeResource,
    ApgCdnTypeResource,

];
