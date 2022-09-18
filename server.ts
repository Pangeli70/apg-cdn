/** -----------------------------------------------------------------------
 * @module [Cdn] My Personal Deno Deploy CDN
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/18] Deno Deploy Beta
 * -----------------------------------------------------------------------
 */
import { Drash, Tng, Uts } from "./deps.ts";
import { resources } from "./res.ts";
import { services } from "./svcs.ts";
import { ApgCdnService } from "./mod.ts";

const SERVER_INFO: Uts.IApgUtsServerInfo = {
  name: 'Apg-Cdn',
  title: 'My Personal Deno Deploy CDN',
  subtitle: '',
  localPort: 49603
}

await ApgCdnService.GetAssets("./public");

Tng.ApgTngService.Init("./templates", {
  useCache: false,
  cacheChunksLongerThan: 100,
  consoleLog: true
});

const server = new Drash.Server({
  hostname: '0.0.0.0',
  port: SERVER_INFO.localPort,
  resources: resources,
  services: services,
  protocol: "http"
});

server.run();

Uts.ApgUtsServer.StartupResume(SERVER_INFO);


