import type { ItemApiResponse, Relic, SingleRelicApiResponse } from "../models/relic"

let relics = await Bun.file("data/relics.json").json() as ItemApiResponse

export const getRelics = () => relics

export const relicSources = (name: string): ItemApiResponse =>
    relics.filter(relic => relic.rewards.some(reward => reward.name === name))

export const relicToString = (relic: Relic) => {
    return relic.era + relic.name + relic.refinement
}

export const getRelicName = (relic: Relic) => {
    return `${relic.era} ${relic.name} (${relic.refinement})`
}

export const getPrimes = () => {
    const primeDropSourcesMap = new Map<string, string[]>()
    relics.forEach(relic => {
        const relicName = getRelicName(relic)
        relic.rewards.forEach(primePart => {
            if (primeDropSourcesMap.has(primePart.name)) primeDropSourcesMap.get(primePart.name)?.push(relicName)
            else primeDropSourcesMap.set(primePart.name, [relicName])
        })
    })
    return Object.fromEntries(primeDropSourcesMap)
}

export const searchRelicsByString = (searchString: string): ItemApiResponse => relics.filter(relic => {
    const relicNameContainsSearchString = getRelicName(relic).toUpperCase().includes(searchString.toUpperCase())
    const relicRewardsContainsSearchString = relic.rewards.some(reward =>
        reward.name.toUpperCase().includes(searchString.toUpperCase()))
    return relicNameContainsSearchString || relicRewardsContainsSearchString
})

export const getRelicWithName = (relicName: string): SingleRelicApiResponse | undefined => {
    const result = relics.find(relic => getRelicName(relic).includes(relicName))
    if (!result) return undefined
    return {
        name: `${result.era}  ${result.name}`,
        rewards: result.rewards,
        vaulted: result.vaulted
    }
}
