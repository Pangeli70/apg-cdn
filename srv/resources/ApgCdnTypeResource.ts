/** -----------------------------------------------------------------------
 * @module [apg-cdn]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/19] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/04/25] Separation of concerns lib/srv
 * -----------------------------------------------------------------------
 */
import { Cdn, Edr, Tng, Dir } from "../deps.ts";

export class ApgCdnTypeResource extends Edr.Drash.Resource {

    public override paths = ["/type/:type"];

    public async GET(request: Edr.Drash.Request, response: Edr.Drash.Response) {

        const rawType = request.pathParam("type");

        const _foldersByExtension_ = Cdn.ApgCdnService.Assets[rawType!];

        const serverInfo = Dir.ApgDirServer.GetInfo(Dir.eApgDirEntriesIds.cdn);

        const templateData = {
            _site_: {
                name: serverInfo.caption,
                title: serverInfo.title,
                deployRoot: "https://apg-cdn.deno.dev"
            },
            _page_: {
                title: "Assets of type: " + rawType,
                toolbar: "",
                released: "2022/09/19"
            },
            _extension_: rawType,
            _foldersByExtension_
        };

        const html = await Tng.ApgTngService.Render("/ApgCdnTypePage.html", templateData) as string;

        response.html(html);

    }


}
