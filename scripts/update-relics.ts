import { warframeItemsRelics } from "../data/warframe-items-relic-data-source"
import { warframeStatRelics } from "../data/warframe-stat-relic-data-source"

const itemToVaultedStatusMapping = new Map<string, boolean>()
warframeItemsRelics.forEach(relic => itemToVaultedStatusMapping.set(relic.name, relic.vaulted!))
const parsedData = warframeStatRelics.map(relic => ({
    name: relic.name,
    rewards: relic.rewards,
    vaulted: itemToVaultedStatusMapping.get(relic.name)
}))
await Bun.write("data/relics.json", JSON.stringify(parsedData))
