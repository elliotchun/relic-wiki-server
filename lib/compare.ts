import type { RelicEra, Relic, RewardRarity, RelicReward } from "../models/relic"

import { rarityMapping, romanNumeralsRequiemMapping } from "./mappings"

export const compareEra = (a: RelicEra, b: RelicEra) => {
    return rarityMapping(a) - rarityMapping(b)
}

export const compareRarity = (a: RewardRarity, b: RewardRarity) => {
    if (a === "Common" && b !== "Common" || a === "Uncommon" && b === "Rare")
        return -1
    if (a !== "Common" && b === "Common" || a === "Rare" && b === "Uncommon")
        return 1
    return 0
}

export const compareRelicName = (a: string, b: string) => {
    // Sorted by letter, then number
    const compareLetter = a.charAt(0).localeCompare(b.charAt(0))
    if (compareLetter === 0) {
        return parseInt(a.substring(1)) - parseInt(b.substring(1))
    }
    return compareLetter
}

export const compareRelicReward = (a: RelicReward, b: RelicReward) => {
    const comparedRarity = compareRarity(a.rarity, b.rarity)
    if (comparedRarity === 0)
        return a.name.localeCompare(b.name)
    return comparedRarity
}

export const compareRelic = (a: Relic, b: Relic) => {
    const comparedEra = compareEra(a.era, b.era)
    if (comparedEra === 0) {
        if (a.era === "Requiem")
            return romanNumeralsRequiemMapping(a.name as "I" | "II" | "III" | "IV") - romanNumeralsRequiemMapping(b.name as "I" | "II" | "III" | "IV")
        return compareRelicName(a.name, b.name)
    }
    return comparedEra
}

