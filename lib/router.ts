import { RelicsWikiRelicsPage } from "../html/generated/relics-wiki-relics-page"
import { RelicsWikiPage } from "../html/generated/relics-wiki-generic-page"
import { PageElementWithHTMLContent, PageElementWithTextContent, type PageElement } from "./page-element"
import { getPrimes as utilGetPrimes, getRelics as utilGetRelics, relicSources, searchRelicsByString, getRelicWithName as utilGetRelicWithName } from "./relic-utils"
import type { SingleRelicApiResponse } from "../models/relic"
import { getOdds } from "./mappings"


export const getHomePage = ({ set }) => {
    return Bun.file("html/index.html")
}

export const getRelicPage = ({ set, query }) => {
    const doesRelicExist = query.relicName && getRelicWithName(query.relicName)
    const generateRelicContainerHtml = (relic: SingleRelicApiResponse): PageElement[] => {
        const result: PageElement[] = []

        result.push(new PageElementWithTextContent({ tag: "div" }, "Item Name"))
        relic.rewards.forEach(reward => result.push(new PageElementWithTextContent({ tag: "div" }, `${reward.name} (${reward.rarity})`)))
        result.push(new PageElementWithTextContent({ tag: "div" }, "Intact Odds"))
        relic.rewards.forEach(reward => result.push(new PageElementWithTextContent({ tag: "div" }, `${getOdds("Intact", reward.rarity)}%`)))
        result.push(new PageElementWithTextContent({ tag: "div" }, "Flawless Odds"))
        relic.rewards.forEach(reward => result.push(new PageElementWithTextContent({ tag: "div" }, `${getOdds("Flawless", reward.rarity)}%`)))
        result.push(new PageElementWithTextContent({ tag: "div" }, "Exceptional Odds"))
        relic.rewards.forEach(reward => result.push(new PageElementWithTextContent({ tag: "div" }, `${getOdds("Exceptional", reward.rarity)}%`)))
        result.push(new PageElementWithTextContent({ tag: "div" }, "Radiant Odds"))
        relic.rewards.forEach(reward => result.push(new PageElementWithTextContent({ tag: "div" }, `${getOdds("Radiant", reward.rarity)}%`)))
        return result
    }

    set.headers["content-type"] = "text/html"
    if (doesRelicExist) {
        const relicName = decodeURI(query.relicName)
        const relic = getRelicWithName(relicName)!
        const relicRewardContainers = generateRelicContainerHtml(relic)
        return RelicsWikiPage({
            title: `${relicName} - Relics Wiki`,
            backgroundImage: "static/SybarisPrimeIncarnon.jpg",
            currentPath: "/relics",
            content: [
                new PageElementWithTextContent({ tag: "h1" }, relicName),
                new PageElementWithHTMLContent({ tag: "div" }, ...relicRewardContainers).addAttribute("class", "rewardContainer")
            ],
            additionalCss: `.rewardContainer {
                display: grid;
                grid-template-columns: auto auto auto auto auto auto auto;
                gap: 1rem;
                padding: 1rem;
            }
            .rewardContainer > div {

            }`
        })
    }
    return RelicsWikiRelicsPage({
        title: "Relics - Relics Wiki",
        backgroundImage: "static/XakuPrime.png",
        currentPath: "/relics"
    })
}

export const getPrimesPage = () => {
    return Bun.file("html/primes.html")
}

export const getPrimes = utilGetPrimes

export const getRelics = utilGetRelics

export const getRelicWithName = utilGetRelicWithName

export const getRelicSources = relicSources

export const getRelicsByString = searchRelicsByString
