import type ItemApiRelicReward from "./api-relic-reward"

export default interface ApiRelic {
    tier: "Lith" | "Neo" | "Meso" | "Axi" | "Requiem"
    relicName: string
    state: "Intact" | "Exceptional" | "Flawless" | "Radiant"
    rewards: ItemApiRelicReward[]
}
