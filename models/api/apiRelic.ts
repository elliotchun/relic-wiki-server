import type ItemApiRelicReward from "./apiRelicReward"

export default interface ApiRelic {
    tier: "Lith" | "Neo" | "Meso" | "Axi" | "Requiem"
    relicName: string
    state: "Intact" | "Exceptional" | "Flawless" | "Radiant"
    rewards: ItemApiRelicReward[]
}
