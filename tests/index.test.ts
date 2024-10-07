// test/index.test.ts
import { describe, expect, it } from "bun:test"
import { app } from "../server"
import { rarityMapping, refinementMapping } from "../lib/mappings"
import { compareRelic } from "../lib/compare"
import type { Relic } from "../models/relic"

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
    it("Lith A1 < Meso A1", () => {
        const LithA1Relic: Relic = {
            name: "A1",
            era: "Lith",
            refinement: "Intact",
            rewards: []
        }
        const MesoA1Relic: Relic = {
            name: "A1",
            era: "Meso",
            refinement: "Intact",
            rewards: []
        }
        expect(compareRelic(LithA1Relic, MesoA1Relic)).toBeLessThan(0)
    })
})
