import DoubleMap from "./double-map.ts";
import type { RelicEra, RelicRefinement } from "../models/relic";
import type { RewardRarity } from "../models/relic-reward";

const intactOdds = new DoubleMap<RewardRarity, number>()
intactOdds.set("Common", 25.33)
intactOdds.set("Uncommon", 11)
intactOdds.set("Rare", 2)

const exceptionalOdds = new DoubleMap<RewardRarity, number>()
exceptionalOdds.set("Common", 23.33)
exceptionalOdds.set("Uncommon", 13)
exceptionalOdds.set("Rare", 4)

const flawlessOdds = new DoubleMap<RewardRarity, number>()
flawlessOdds.set("Common", 20)
flawlessOdds.set("Uncommon", 17)
flawlessOdds.set("Rare", 6)

const radiantOdds = new DoubleMap<RewardRarity, number>()
radiantOdds.set("Common", 16.67)
radiantOdds.set("Uncommon", 20)
radiantOdds.set("Rare", 10)

const oddsTable = new Map<RelicRefinement, DoubleMap<RewardRarity, number>>()
oddsTable.set("Intact", intactOdds)
oddsTable.set("Exceptional", exceptionalOdds)
oddsTable.set("Flawless", flawlessOdds)
oddsTable.set("Radiant", radiantOdds)

export const getOdds = (refinement: RelicRefinement, rarity: RewardRarity) => oddsTable.get(refinement)!.getOne(rarity)!
export const getRarity = (refinement: RelicRefinement, chance: number) => oddsTable.get(refinement)!.getTwo(chance)!

export const rarityMapping = (era: RelicEra) => {
    const table = {
        Lith: 0,
        Neo: 1,
        Meso: 2,
        Axi: 3,
        Requiem: 4
    }
    return table[era]
}

export const refinementMapping = (refinement: RelicRefinement) => {
    const table = {
        Intact: 0,
        Exceptional: 1,
        Flawless: 2,
        Radiant: 3
    }
    return table[refinement]
}

export const romanNumeralsRequiemMapping = (name: "I" | "II" | "III" | "IV") => {
    const table = {
        I: 1,
        II: 2,
        III: 3,
        IV: 4
    }
    return table[name]
}
