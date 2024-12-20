import { compareRelic, compareRelicReward } from "../lib/compare"
import Items from "warframe-items"
import type { Relic } from "warframe-items"
import type { RelicEra, RelicRefinement, Relic as IRelic, RelicReward } from "../models/relic"

const relics = new Items({ category: ["Relics"] }) as Relic[]

export const warframeItemsRelics = relics
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
    .sort(compareRelic)
