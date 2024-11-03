import { compareRelic, compareRelicReward } from "../lib/compare"
import { getRarity } from "../lib/mappings"
import type ApiRelic from "../models/api/api-relic"
import type ItemApiResponse from "../models/api/api-response"

const response = await fetch("https://drops.warframestat.us/data/relics.json")
if (response.ok) {
    const itemApiResponse: ItemApiResponse = await response.json()
    await Bun.write("data/relics.json", JSON.stringify({
        relics: itemApiResponse.relics.map((apiRelic: ApiRelic) => ({
            name: apiRelic.relicName,
            era: apiRelic.tier,
            refinement: apiRelic.state,
            rewards: apiRelic.rewards.map(apiRelicReward => ({
                name: apiRelicReward.itemName,
                rarity: getRarity(apiRelic.state, apiRelicReward.chance)
            }))
                .sort(compareRelicReward)
        }))
            .sort(compareRelic)
    }))
    console.log("Updated relics data!")
}
else {
    console.log("Something went wrong!")
}
