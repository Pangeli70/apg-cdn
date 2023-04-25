/** -----------------------------------------------------------------------
 * @module [Cdn/srv]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/19] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/04/25] Separation of concerns lib/srv
 * -----------------------------------------------------------------------
 */
import { Drash, Tng, Dir } from "../deps.ts";
import { ApgCdnService } from "../../lib/mod.ts";


export class ApgCdnHomeResource extends Drash.Resource {

    public override  paths = ["/"];

    public async GET(_request: Drash.Request, response: Drash.Response) {

        const resources = ApgCdnService.Resources();

        const SERVER_INFO = Dir.ApgDirGetServerInfo(Dir.ApgDirEntries[Dir.eApgDirEntriesIds.cdn]);

        const templateData = {
            site: {
                name: SERVER_INFO.caption,
                title: SERVER_INFO.title
            },
            page: {
                title: "Available content by file extension",
                toolbar: "",
                released: "2022/09/19"
            },
            resources
        };

        const html = await Tng.ApgTngService.Render("/home.html", templateData) as string;

        response.html(html);

    }


}
