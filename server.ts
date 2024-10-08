import { Elysia, t } from "elysia"
import { cors } from "@elysiajs/cors"
import { html } from "@elysiajs/html"
import { staticPlugin } from "@elysiajs/static"
import {getPrimes, getRelics, relicSources} from "./lib/relic-utils"
import { LobbyManager } from "./lib/lobby-manager"

const port = 8080
export const app = new Elysia()
    .use(staticPlugin({ assets: 'public', prefix: '' }))
    .use(html())
    .use(cors())
    .get("/", Bun.file('static/index.html'))
    .get("relics", Bun.file("static/relics.html"))
    .get("primes", Bun.file("static/primes.html"))
    .group("/api", app =>
        app
            .get("/relics", async () => await getRelics())
            .get("/primes", async () => await getPrimes())
            .get("/primes/:name", async ({ params: { name } }) => await relicSources(decodeURI(name)),
                {
                    params: t.Object({
                        name: t.String()
                    })
                })
            .get("/squads/relic/:relic/", ({ params: { relic } }) => ({
                lobbies: {
                    intact: LobbyManager.getLobby(relic, "Intact").map(u => u.name),
                    exceptional: LobbyManager.getLobby(relic, "Exceptional").map(u => u.name),
                    flawless: LobbyManager.getLobby(relic, "Flawless").map(u => u.name),
                    radiant: LobbyManager.getLobby(relic, "Radiant").map(u => u.name)
                }
            }), {
                params: t.Object({
                    relic: t.String()
                })
            })
            .get("/squads/relic/:relic/:refinement", ({ params: { relic, refinement } }) => ({
                lobby: LobbyManager.getLobby(relic, refinement).map(u => u.name)
            }), {
                params: t.Object({
                    relic: t.String(),
                    refinement: t.String()
                })
            })
            .post("/squads/join/relic/:relic/:refinement", ({ body, params: { relic, refinement } }) => ({
                lobby: LobbyManager.joinLobby({ name: body.username }, relic, refinement)
            }), {
                body: t.Object({
                    username: t.String()
                }),
                params: t.Object({
                    relic: t.String(),
                    refinement: t.String()
                })
            })
    )
    .onError(({ code }) => {
        if (code === "NOT_FOUND")
            return "Error 404"
    })
    .listen(port)

console.log(`Listening on port ${port}...`)
