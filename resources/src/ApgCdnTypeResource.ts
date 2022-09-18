/** -----------------------------------------------------------------------
 * @module [Cdn/Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/19] Deno Deploy Beta
 * -----------------------------------------------------------------------
 */
import { Drash, Tng } from "../../deps.ts";
import { ApgCdnService } from "../../src/mod.ts";
import { ApgCdnCommonData } from "../data/ApgCdnCommonData.ts";

export class ApgCdnTypeResource extends Drash.Resource {

    public paths = ["/type/:type"];

    public async GET(request: Drash.Request, response: Drash.Response) {

        const reqType = request.pathParam("type");

        // TODO Performance Add parameter to this method to filter releavnt data --APG 20220919
        const resources = ApgCdnService.Resources();
        const folderIndex = resources.findIndex((atype) => {
            return atype.type == reqType;
        });
        const resourcesOfType = resources[folderIndex];

        const templateData = {
            site: ApgCdnCommonData.site,
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
