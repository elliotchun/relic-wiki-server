const response = await fetch("api/relics")
const relics = (await response.json()).relics
const relicContainerElement = document.getElementById("container-content")
relics.forEach(relic => {
    const relicInfo = document.createElement("div")
    relicInfo.innerText = `${relic.era} ${relic.name} (${relic.refinement})`
    relicContainerElement.appendChild(relicInfo)
})
