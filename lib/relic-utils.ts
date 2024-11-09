import type { Relic } from "../models/relic"
import type { RelicReward } from "../models/relic-reward.ts";

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

export const getPrimes = async () => {
    const relics = await getRelics()
    const primeDropSourcesMap = new Map<string, string[]>()
    relics.relics.forEach(relic => {
        const relicName = `${relic.era} ${relic.name} (${relic.refinement})`
        relic.rewards.forEach(primePart => {
            if (primeDropSourcesMap.has(primePart.name))
                primeDropSourcesMap.get(primePart.name)?.push(relicName)
            else
                primeDropSourcesMap.set(primePart.name, [relicName])
        })
    })

    return Object.fromEntries(primeDropSourcesMap)
}