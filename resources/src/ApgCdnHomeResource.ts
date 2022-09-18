/** -----------------------------------------------------------------------
 * @module [Cdn/Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/19] Deno Deploy Beta
 * -----------------------------------------------------------------------
 */
import { Drash, Tng } from "../../deps.ts";
import { ApgCdnService } from "../../src/mod.ts";
import { ApgCdnCommonData } from "../data/ApgCdnCommonData.ts";



export class ApgCdnHomeResource extends Drash.Resource {

    public paths = ["/"];

    public async GET(_request: Drash.Request, response: Drash.Response) {

        const resources = ApgCdnService.Resources();

        const templateData = {
            site: ApgCdnCommonData.site,
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
