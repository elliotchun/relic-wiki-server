import { compareRelic, compareRelicReward } from "../lib/compare"
import { getRarity } from "../lib/mappings"
import { getRelicName } from "../lib/relic-utils"
import type { Relic, ItemApiResponse } from "../models/relic"

interface WarframeStatApiRelicReward {
    _id: string
    itemName: string
    rarity: "Uncommon" | "Rare"
    chance: number
}

interface WarframeStatApiRelic {
    tier: "Lith" | "Neo" | "Meso" | "Axi" | "Requiem"
    relicName: string
    state: "Intact" | "Exceptional" | "Flawless" | "Radiant"
    rewards: WarframeStatApiRelicReward[]
}

const response = await fetch("https://drops.warframestat.us/data/relics.json")
const itemApiResponse = await response.json()
export const warframeStatRelics: ItemApiResponse = itemApiResponse.relics
    .map((apiRelic: WarframeStatApiRelic) => ({
        name: apiRelic.relicName,
        era: apiRelic.tier,
        refinement: apiRelic.state,
        rewards: apiRelic.rewards
            .map(apiRelicReward => ({
                name: apiRelicReward.itemName,
                rarity: getRarity(apiRelic.state, apiRelicReward.chance)
            }))
            .sort(compareRelicReward)
    }))
    .sort(compareRelic)
    .filter((relic: Relic) => relic.refinement === "Intact")
    .map((relic: Relic) => ({
        name: `${relic.era} ${relic.name}`,
        rewards: relic.rewards
    }))
