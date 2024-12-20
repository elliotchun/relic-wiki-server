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
const mapSearchResultsCache = new Map()
let searchString = ""

const updateRelicList = (relics) => {
    relicContainerElement.innerHTML = ""
    relics.forEach(relic => {
        const relicInfo = document.createElement("div")
        relicInfo.innerText = `${relic.era} ${relic.name} (${relic.refinement})`
        if (relic.vaulted) relicInfo.innerText += `\n[Vaulted]`
        else if (relic.vaulted === false && relic.dropLocations?.length > 0) {
            const relicSources = relic.dropLocations.map(location => location.location).join(", ")
            relicInfo.innerText += `\nDrops from ${relicSources}`
        }
        relicInfo.classList.add("container-relic")
        relicContainerElement.appendChild(relicInfo)
    })
}

const submitSearch = async () => {
    searchString = txtSearch.value
    let apiEndpoint = `api/search/${searchString}`

    if (searchString.length < 3) {
        if (searchString.length === 0) apiEndpoint = "api/relics"
        else return
    }

    const getSearchResultsFromApi = async (searchString) => {
        const response = await fetch(apiEndpoint)
        const searchResult = await response.json()
        mapSearchResultsCache.set(searchString, searchResult)
        return searchResult
    }
    const searchResult = mapSearchResultsCache.get(searchString) || await getSearchResultsFromApi(searchString)
    updateRelicList(searchResult)
}

txtSearch.addEventListener("input", debounce(submitSearch, 300))
submitSearch()
