/** -----------------------------------------------------------------------
 * @module [apg-cdn]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/19] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/04/25] Separation of concerns lib/srv
 * -----------------------------------------------------------------------
 */
import { Cdn, Edr, Tng, Dir } from "../deps.ts";


export class ApgCdnHomeResource extends Edr.Drash.Resource {

    public override paths = ["/"];

    public async GET(_request: Edr.Drash.Request, response: Edr.Drash.Response) {

        const _extensions_ = Object.keys(Cdn.ApgCdnService.Assets);

        const serverInfo = Dir.ApgDirServer.GetInfo(Dir.eApgDirEntriesIds.cdn);

        const templateData = {
            _site_: {
                name: serverInfo.caption,
                title: serverInfo.title
            },
            _page_: {
                title: "Available content by file extension",
                toolbar: "",
                released: "2022/09/19"
            },
            _extensions_
        };

        const html = await Tng.ApgTngService.Render("/ApgCdnHomePage.html", templateData) as string;

        response.html(html);

    }


}
