const relicContainerElement = document.getElementById("container-relics")

const debounce = (callback, timeout) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(async () => {
            await callback.apply(this, args)
        }, timeout)
    }
}

const txtSearch = document.getElementById("input-search")
let searchString = ""

const updateRelicList = (relics) => {
    relicContainerElement.innerHTML = ""
    relics.forEach(relic => {
        const relicName = relic.name
        const linkToRelicPage = document.createElement("a")
        linkToRelicPage.setAttribute("href", `?relicName=${relicName}`)
        const relicInfo = document.createElement("div")
        relicInfo.innerText = relicName
        if (relic.vaulted) relicInfo.innerText += `\n[Vaulted]`
        if (relic.dropLocations?.length > 0) {
            const relicSources = relic.dropLocations.map(location => location.location).join(", ")
            relicInfo.innerText += `\nDrops from ${relicSources}`
        }
        relicInfo.classList.add("container-relic")
        linkToRelicPage.appendChild(relicInfo)
        relicContainerElement.appendChild(linkToRelicPage)
    })
}

const response = await fetch("api/relics")
const relics = await response.json()

const submitSearch = () => {
    searchString = txtSearch.value
    if (searchString.length < 3) {
        if (searchString.length === 0)
            updateRelicList(relics)
        return
    }

    const searchResult = relics.filter(relic => {
        const relicNameContainsSearchString = relic.name.toUpperCase().includes(searchString.toUpperCase())
        const relicRewardsContainsSearchString = relic.rewards.some(reward => reward.name.toUpperCase().includes(searchString.toUpperCase()))
        return relicNameContainsSearchString || relicRewardsContainsSearchString
    })

    updateRelicList(searchResult)
}

txtSearch.addEventListener("input", debounce(submitSearch, 300))
submitSearch()
