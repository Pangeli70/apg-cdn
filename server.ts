/** -----------------------------------------------------------------------
 * @module [apg-cdn] My Personal Deno Deploy CDN
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/18] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/04/25] Separation of concerns lib/srv
 * -----------------------------------------------------------------------
 */
import { Cdn, Tng, Dir , Edr, Lgr} from "./srv/deps.ts";
import { ApgCdnResources, ApgCdnServices } from "./srv/mod.ts";

Edr.ApgEdrService.Init({
  assetsFolder: "./srv"
});

Lgr.ApgLgr.AddConsoleTransport();

await Cdn.ApgCdnService.GetAssets("./srv/assets");

const serverInfo = Dir.ApgDirServer.GetInfo(Dir.eApgDirEntriesIds.cdn);

const remoteTngHost = "";

Tng.ApgTngService.Init("./srv/templates", remoteTngHost, {
  useCache: false,
  cacheChunksLongerThan: 100,
  consoleLog: true,
  beginMarkup: "<%",
  endMarkup: "%>"
});

const server = new Edr.Drash.Server({
  hostname: '0.0.0.0',
  port: serverInfo.localPort,
  resources: ApgCdnResources,
  services: ApgCdnServices,
  protocol: "http"
});

server.run();

Dir.ApgDirServer.StartupResume(serverInfo);


