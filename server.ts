import { Elysia, redirect, t } from "elysia"
import { cors } from "@elysiajs/cors"
import { html } from "@elysiajs/html"
import { staticPlugin } from "@elysiajs/static"
import { getPrimes, getRelics, relicSources, searchRelicsByString, getRelicWithName } from "./lib/relic-utils"
import { LobbyManager } from "./lib/lobby-manager"
import { getSingleRelicPage } from "./scripts/relic-page"

const port = 8080
export const app = new Elysia()
    .use(staticPlugin({ assets: 'public', prefix: '' }))
    .use(html())
    .use(cors())
    .get("/", Bun.file('html/index.html'))
    .get("/relics", async ({ query }) => {
        if (query.relicName && getRelicWithName(query.relicName))
            return Bun.file(`html/single-relic.html`)
        return Bun.file("html/relics.html")
    }, {
        query: t.Optional(
            t.Object({
                relicName: t.String()
            })
        )
    })
    .get("primes", Bun.file("html/primes.html"))
    .group("/api", app => app
        .get("relic", getRelicWithName)
        .get("/relics", getRelics)
        .get("/primes", getPrimes)
        .get("/primes/:name", ({ params: { name } }) =>
            relicSources(decodeURI(name)),
            {
                params: t.Object({
                    name: t.String()
                })
            })
        .get("/search/:query", ({ params: { query } }) =>
            searchRelicsByString(decodeURI(query)),
            {
                params: t.Object({
                    query: t.String()
                })
            })
        .group("/squads", app => app
            .get("/relic/:relic/", ({ params: { relic } }) =>
            ({
                lobbies: {
                    intact: LobbyManager.getLobby(relic, "Intact").map(u => u.name),
                    exceptional: LobbyManager.getLobby(relic, "Exceptional").map(u => u.name),
                    flawless: LobbyManager.getLobby(relic, "Flawless").map(u => u.name),
                    radiant: LobbyManager.getLobby(relic, "Radiant").map(u => u.name)
                }
            }),
                {
                    params: t.Object({
                        relic: t.String()
                    })
                })
            .get("/relic/:relic/:refinement", ({ params: { relic, refinement } }) =>
            ({
                lobby: LobbyManager.getLobby(relic, refinement).map(u => u.name)
            }),
                {
                    params: t.Object({
                        relic: t.String(),
                        refinement: t.String()
                    })
                })
            .post("/join/relic/:relic/:refinement", ({ body, params: { relic, refinement } }) =>
            ({
                lobby: LobbyManager.joinLobby({ name: body.username }, relic, refinement)
            }),
                {
                    body: t.Object({
                        username: t.String()
                    }),
                    params: t.Object({
                        relic: t.String(),
                        refinement: t.String()
                    })
                })
        )
    )
    .onError(({ code }) => {
        if (code === "NOT_FOUND")
            return "Error 404"
    })
    .listen(port)

console.log(`Listening on port ${port}...`)
