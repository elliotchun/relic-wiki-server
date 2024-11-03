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
    const primes = new Map<RelicReward, Relic[]>()
    relics.relics.forEach(relic => {
        relic.rewards.forEach(prime_part => {
            primes.has(prime_part) ?
                primes.get(prime_part)!.push(relic) :
                primes.set(prime_part, [relic])
        })
    })
    const list: any[] = []
    primes.forEach((relic_list, reward) => {
        let reward_object: any = {}
        reward_object[reward.name] = relic_list
        list.push(reward_object)
    })

    return list
}