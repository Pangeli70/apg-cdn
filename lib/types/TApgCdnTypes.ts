/** -----------------------------------------------------------------------
 * @module [apg-cdn]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.7 [APG 2023/05/28] Separation of concerns lib/srv
 * -----------------------------------------------------------------------
 */

import { IApgCdnFolder } from "../interfaces/IApgCdnFolder.ts";

/**
 * Data repository
 */
export type TApgCdnAssets = Record<string, IApgCdnFolder[]>;
