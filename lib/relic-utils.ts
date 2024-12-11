import { getRelicName, type ItemApiResponse, type Relic } from "../models/relic"

let relics = await Bun.file("data/relics.json").json() as ItemApiResponse

export const getRelics = () => relics

export const relicSources = (name: string): ItemApiResponse =>
    relics.filter(relic => relic.rewards.some(reward => reward.name === name))

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
    const relicName = getRelicName(relic)
    const relicRewardsContainsSearchString = relic.rewards.some(reward =>
        reward.name.toUpperCase().includes(searchString.toUpperCase()))
    const relicNameContainsSearchString = relicName.toUpperCase().includes(searchString.toUpperCase())
    return relicRewardsContainsSearchString || relicNameContainsSearchString
})

