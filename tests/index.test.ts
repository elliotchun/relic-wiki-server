// test/index.test.ts
import { describe, expect, it } from "bun:test"
import { app } from "../server"
import { rarityMapping, refinementMapping } from "../lib/mappings"

describe("Elysia", () => {
    it("All lobbies exist for a random relic", async () => {
        const response = await app
            .handle(new Request("http://localhost/api/squads/relic/AxiA13/"))
            .then((res) => res.json())
        expect(response).toContainKey("lobbies")
        expect(response.lobbies).toContainAllKeys(["intact", "exceptional", "flawless", "radiant"])
    })
})

describe("Relic Compare", () => {
    it("Lith < Neo", () => {
        expect(rarityMapping("Lith") < rarityMapping("Neo"))
    })
    it("Neo < Meso", () => {
        expect(rarityMapping("Neo") < rarityMapping("Meso"))
    })
    it("Meso < Axi", () => {
        expect(rarityMapping("Meso") < rarityMapping("Axi"))
    })
    it("Axi < Requiem", () => {
        expect(rarityMapping("Axi") < rarityMapping("Requiem"))
    })
    it("Intact < Exceptional", () => {
        expect(refinementMapping("Intact") < refinementMapping("Exceptional"))
    })
    it("Exceptional < Flawless", () => {
        expect(refinementMapping("Exceptional") < refinementMapping("Flawless"))
    })
    it("Flawless < Radiant", () => {
        expect(refinementMapping("Flawless") < refinementMapping("Radiant"))
    })
})
