/** -----------------------------------------------------------------------
 * @module [apg-cdn]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/19] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/04/25] Separation of concerns lib/srv
 * -----------------------------------------------------------------------
 */
import { Uts } from "../deps.ts";

interface IApgCdnFolder {
    name: string;
    files: string[],
}

type TApgCdnAssets = Record<string, IApgCdnFolder[]>;

export class ApgCdnService {

    /**  */
    //private static _assets: Map<string, Map<string, string[]>> =  new Map();
    private static _assets: TApgCdnAssets = {};

    static get Assets() { return this._assets; }

    // WARNING Using nested maps we can catch easily misplaced files --APG 20220919
    static async GetAssets(afolder: string,) {

        const dirEntries = Deno.readDir(Uts.Std.Path.normalize(afolder));
        for await (const dirEntry of dirEntries) {
            if (dirEntry.isDirectory) {
                this.GetAssets(afolder + "/" + dirEntry.name);
            }
            else {
                if (dirEntry.isFile) {

                    const fileExt = Uts.Std.Path.extname(dirEntry.name);

                    if (!this._assets[fileExt]) {
                        this._assets[fileExt] = [];
                    }
                    const assetFolders = this._assets[fileExt];

                    let addFolder = assetFolders.length == 0;

                    if (!addFolder) {
                        const index = assetFolders.findIndex(a => a.name == afolder)
                        if (index == -1) {
                            addFolder = true;
                        }
                    }

                    if (addFolder) {
                        const folder = {
                            name: afolder,
                            files: []
                        };
                        this._assets[fileExt].push(folder);
                    }

                    const index = assetFolders.findIndex(a => a.name == afolder)

                    this._assets[fileExt][index].files.push(dirEntry.name);
                }
            }
        }
    }


}