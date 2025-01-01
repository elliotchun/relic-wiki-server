import { Elysia, error, t } from "elysia"
import { cors } from "@elysiajs/cors"
import { staticPlugin } from "@elysiajs/static"
import { LobbyManager } from "./lib/lobby-manager"
import { getHomePage, getPrimesPage, getRelicPage, getRelics, getPrimes, getRelicWithName, getRelicSources, getRelicsByString } from "./lib/router"

const port = 8080


export const app = new Elysia()
    .use(staticPlugin({ assets: 'public', prefix: '' }))
    .use(cors())
    .get("/", getHomePage)
    .get("/relics", getRelicPage, {
        query: t.Optional(
            t.Object({
                relicName: t.String()
            })
        )
    })
    .get("/primes", getPrimesPage)
    .group("/api", app => app
        .get("/relics", getRelics)
        .get("/relics/:name", ({ params: { name } }) =>
            getRelicWithName(decodeURI(name)),
            {
                params: t.Object({
                    name: t.String()
                })
            })
        .get("/primes", getPrimes)
        .get("/primes/:name", ({ params: { name } }) =>
            getRelicSources(decodeURI(name)),
            {
                params: t.Object({
                    name: t.String()
                })
            })
        .get("/search/:query", ({ params: { query } }) =>
            getRelicsByString(decodeURI(query)),
            {
                params: t.Object({
                    query: t.String()
                })
            })
        .post("/auth", () => {
            return error(503, "Service Unavailable")
        },
            {
                body: t.Object({
                    username: t.String(),
                    password: t.String()
                })
            })
        .group("/squads", app => app
            .guard({
                beforeHandle: ({ cookie: { session } }) => {
                    return error(503, "Service Unavailable")
                }
            }, app => app
                .get("/", Array.from(LobbyManager.availableLobbies()))
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
    )
    .onError(({ code }) => {
        if (code === "NOT_FOUND")
            return "Error 404"
    })
    .listen(port)

console.log(`Listening on port ${port}...`)
