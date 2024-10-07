import type { Relic } from "../models/relic"

interface Relics {
    relics: Relic[]
}

export const getRelics = async () => {
    return await Bun.file("data/relics.json").json() as Relics
}

export const relicSources = async (name: string) => {
    const relics = await getRelics()
    return {
        relics: relics.relics.filter(relic => relic.rewards.some(reward => reward.name === name))
    }
}
