import { compareRelic, compareRelicReward } from "../lib/compare"
import Items from "warframe-items"
import type { Relic } from "warframe-items"
import type { RelicEra, RelicRefinement, Relic as IRelic, RelicReward, ItemApiResponse } from "../models/relic"

const relics = new Items({ category: ["Relics"] }) as Relic[]

export const warframeItemsRelics: ItemApiResponse = relics
    .map(relic => {
        const [relicEra, relicId, relicRefinement] = relic.name.split(" ")
        return {
            name: relicId,
            era: relicEra as RelicEra,
            refinement: relicRefinement as RelicRefinement,
            rewards: relic.rewards
                .map(reward => ({
                    name: reward.item.name,
                    rarity: reward.rarity
                } as RelicReward))
                .sort(compareRelicReward),
            dropLocations: relic.locations.map(location => ({
                chance: location.chance,
                location: location.location
            })),
            vaulted: relic.vaulted
        } as IRelic
    })
    .filter(relic => !(relic.refinement === undefined))
    .filter(relic => relic.refinement === "Intact")
    .sort(compareRelic)
    .map((relic: IRelic) => ({
        name: `${relic.era} ${relic.name}`,
        rewards: relic.rewards,
        vaulted: relic.vaulted
    }))
