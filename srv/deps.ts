/** -----------------------------------------------------------------------
 * @module [Cdn/srv]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.7 [APG 2023/04/25] Separation of concerns lib/srv
 * ------------------------------------------------------------------------
*/

// https://deno.land/std
export * as StdFs from "https://deno.land/std@0.180.0/fs/mod.ts";
export * as StdPath from "https://deno.land/std@0.180.0/path/mod.ts";

// https://deno.land/x/drash
export * as  Drash from "https://deno.land/x/drash@v2.7.1/mod.ts";

// https://deno.land/x/drash_middleware
export { CORSService as DrashCorsService } from "https://deno.land/x/drash@v2.7.1/src/services/cors/cors.ts";

// https://github
export * as Edr from "https://raw.githubusercontent.com/Pangeli70/apg-edr/master/mod.ts";
export * as Tng from "https://raw.githubusercontent.com/Pangeli70/apg-tng/master/mod.ts";
export * as Uts from "https://raw.githubusercontent.com/Pangeli70/apg-uts/master/mod.ts";
export * as Dir from "https://raw.githubusercontent.com/Pangeli70/apg-dir/master/lib/mod.ts";