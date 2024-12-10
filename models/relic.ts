export type RewardRarity = "Common" | "Uncommon" | "Rare"

export interface RelicReward {
    name: string
    rarity: RewardRarity
}

export type RelicRefinement = "Intact" | "Exceptional" | "Flawless" | "Radiant"
export type RelicEra = "Lith" | "Neo" | "Meso" | "Axi" | "Requiem"

export interface Relic {
    name: string
    era: RelicEra
    refinement: RelicRefinement
    rewards: RelicReward[]
}

export const relicToString = (relic: Relic) => {
    return relic.era + relic.name + relic.refinement
}

export const getRelicName = (relic: Relic) => {
    return `${relic.era} ${relic.name} (${relic.refinement})`
}
