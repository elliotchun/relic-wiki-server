import { compareRelic, compareRelicReward } from "../lib/compare"
import { getRarity } from "../lib/mappings"
import type ApiRelic from "../models/api/api-relic"
import type ItemApiResponse from "../models/api/api-response"

const response = await fetch("https://drops.warframestat.us/data/relics.json")
if (response.ok) {
    const apiresponse: ItemApiResponse = await response.json()
    await Bun.write("data/relics.json", JSON.stringify({
        relics: apiresponse.relics.map((apirelic: ApiRelic) => ({
            name: apirelic.relicName,
            era: apirelic.tier,
            refinement: apirelic.state,
            rewards: apirelic.rewards.map(apirelicreward => ({
                name: apirelicreward.itemName,
                rarity: getRarity(apirelic.state, apirelicreward.chance)
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
