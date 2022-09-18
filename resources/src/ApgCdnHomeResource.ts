/** -----------------------------------------------------------------------
 * @module [Cdn/Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/19] Deno Deploy Beta
 * -----------------------------------------------------------------------
 */
import { Drash, Tng } from "../../deps.ts";


export class ApgCdnHomeResource extends Drash.Resource {

    public paths = ["/"];

    public async GET(_request: Drash.Request, response: Drash.Response) {

        const templateData = {
            site: {
                name: 'Apg-Cdn',
                title: 'My Personal CDN based on Deno Deploy'
            },
            page: {
                title: " Home",
                toolbar: "",
                released: "2022/09/19"
            },
            content: [
                {
                    folder: "css",
                    items: [ "pico-custom.css"]
                },
                {
                    folder: "img/ico",
                    items: ["apg-favicon.ico"]
                },
                {
                    folder: "img/jpg",
                    items: ["apg-2016.jpg"]
                },
                {
                    folder: "img/png",
                    items: ["apg-logo-2022-48px.jpg", "apg-logo-2022-48px.jpg"]
                }
            ],
        };

        const html = await Tng.ApgTngService.Render("/home.html", templateData) as string;

        response.html(html);

    }


}
