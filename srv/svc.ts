/** -----------------------------------------------------------------------
 * @module [Cdn/srv]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.7 [APG 2023/04/25] Separation of concerns lib/srv
 * ------------------------------------------------------------------------
*/
import { DrashCorsService, Drash } from "./deps.ts";

export const services: Drash.Service[] = [
    new DrashCorsService()
];