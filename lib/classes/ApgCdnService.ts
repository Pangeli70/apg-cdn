/** -----------------------------------------------------------------------
 * @module [Cdn]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/19] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/04/25] Separation of concerns lib/srv
 * -----------------------------------------------------------------------
 */
import { StdPath } from "../deps.ts";

export class ApgCdnService {

    static #resources: Map<string, Map<string, string[]>> =  new Map();

    // WARNING Using nested maps we can catch easily misplaced files --APG 20220919
    static async GetAssets(afolder: string, ) {

        const dirEntries = Deno.readDir(StdPath.normalize(afolder));
        for await (const dirEntry of dirEntries) {
            if (dirEntry.isDirectory) {
                this.GetAssets(afolder + "/" + dirEntry.name);
            }
            else {
                if (dirEntry.isFile) {
                    const fileExt = StdPath.extname(dirEntry.name);
                    if (!this.#resources.has(fileExt)) {
                        this.#resources.set(fileExt, new Map());
                    }
                    const foldersMap = this.#resources.get(fileExt);
                    if (!foldersMap!.has(afolder)) {
                        foldersMap!.set(afolder, []);
                    }
                    const fileEntries = foldersMap?.get(afolder);
                    fileEntries?.push(dirEntry.name);
                }
            }
        }
    }

    // WARNING Smell This is a DTO... But we can't pass maps directly to Tng --APG 20220919
    static Resources() { 
        const r: any[] = [];
        for (const extKey of this.#resources.keys()) { 
            const fileType: any = {};
            fileType.type = extKey;
            fileType.folders = [];
            r.push(fileType);
            const folders = this.#resources.get(extKey);
            for (const folderKey of folders!.keys()) {
                const folder: any = {};
                folder.name = folderKey;
                folder.files = folders!.get(folderKey);
                fileType.folders.push(folder);
            }
        }
        return r;
    }
}