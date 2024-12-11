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
        relicInfo.classList.add("container-relic")
        relicContainerElement.appendChild(relicInfo)
    })
}

const submitSearch = async () => {
    searchString = txtSearch.value
    if (searchString.length < 3) return
    const getSearchResultsFromApi = async (searchString) => {
        const response = await fetch(`api/search/${searchString}`)
        const searchResult = await response.json()
        mapSearchResultsCache.set(searchString, searchResult)
        return searchResult
    }
    const searchResult = mapSearchResultsCache.get(searchString) || await getSearchResultsFromApi(searchString)
    updateRelicList(searchResult)
}

txtSearch.addEventListener("input", debounce(submitSearch, 300))

const response = await fetch("api/relics")
const relics = await response.json()
updateRelicList(relics)
