/** -----------------------------------------------------------------------
 * @module [Cdn/srv]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/19] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/04/25] Separation of concerns lib/srv
 * -----------------------------------------------------------------------
 */
import { Drash, Tng, Dir } from "../deps.ts";
import { ApgCdnService } from "../../lib/mod.ts";

export class ApgCdnTypeResource extends Drash.Resource {

    public override paths = ["/type/:type"];

    public async GET(request: Drash.Request, response: Drash.Response) {

        const reqType = request.pathParam("type");

        // TODO Performance Add parameter to this method to filter relevant data --APG 20220919
        const resources = ApgCdnService.Resources();
        const folderIndex = resources.findIndex((atype) => {
            return atype.type == reqType;
        });
        const resourcesOfType = resources[folderIndex];

        const SERVER_INFO = Dir.ApgDirGetServerInfo(Dir.ApgDirEntries[Dir.eApgDirEntriesIds.cdn]);

        const templateData = {
            site: {
                name: SERVER_INFO.caption,
                title: SERVER_INFO.title,
                deployRoot: "https://apg-cdn.deno.dev"
            },
            page: {
                title: "Files available for type: " + reqType,
                toolbar: "",
                released: "2022/09/19"
            },
            type: resourcesOfType.type,
            folders: resourcesOfType.folders
        };

        const html = await Tng.ApgTngService.Render("/type.html", templateData) as string;

        response.html(html);

    }


}
