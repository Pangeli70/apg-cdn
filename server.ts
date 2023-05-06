/** -----------------------------------------------------------------------
 * @module [Cdn] My Personal Deno Deploy CDN
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/18] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/04/25] Separation of concerns lib/srv
 * -----------------------------------------------------------------------
 */
import { Drash, Tng, Uts, Dir , Edr, Lgr} from "./srv/deps.ts";
import { ApgCdnResources } from "./srv/res.ts";
import { ApgCdnServices } from "./srv/svc.ts";
import { Cdn } from "./mod.ts";

Edr.ApgEdrService.Init({
  assetsFolder: "./srv"
});

Lgr.ApgLgr.AddConsoleTransport();

await Cdn.ApgCdnService.GetAssets("./srv/assets");

const SERVER_INFO = Dir.ApgDirGetServerInfo(Dir.ApgDirEntries[Dir.eApgDirEntriesIds.cdn]);

const remoteTngHost = "";

Tng.ApgTngService.Init("./srv/templates", remoteTngHost, {
  useCache: false,
  cacheChunksLongerThan: 100,
  consoleLog: true,
  beginMarkup: "<%",
  endMarkup: "%>"
});

const server = new Drash.Server({
  hostname: '0.0.0.0',
  port: SERVER_INFO.localPort,
  resources: ApgCdnResources,
  services: ApgCdnServices,
  protocol: "http"
});

server.run();

Uts.ApgUtsServer.StartupResume(SERVER_INFO);


