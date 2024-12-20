export type RewardRarity = "Common" | "Uncommon" | "Rare"

export interface RelicDropLocation {
    chance: number,
    location: string
}

export interface RelicReward {
    name: string,
    rarity: RewardRarity
}

export type RelicRefinement = "Intact" | "Exceptional" | "Flawless" | "Radiant"
export type RelicEra = "Lith" | "Neo" | "Meso" | "Axi" | "Requiem"

export interface Relic {
    name: string,
    era: RelicEra,
    refinement: RelicRefinement,
    rewards: RelicReward[],
    dropLocations?: RelicDropLocation[],
    vaulted?: boolean
}

export interface SingleRelicApiResponse {
    name: string,
    rewards: RelicReward[],
    vaulted?: boolean
}

export type ItemApiResponse = SingleRelicApiResponse[]
