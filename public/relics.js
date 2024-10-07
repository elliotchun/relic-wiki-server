const response = await fetch("api/relics")
const relics = (await response.json()).relics
const relicContainerElement = document.getElementById("container-relics")
relics.forEach(relic => {
    const relicInfo = document.createElement("div")
    relicInfo.innerText = `${relic.era} ${relic.name} (${relic.refinement})`
    relicInfo.classList.add("container-relic")
    relicContainerElement.appendChild(relicInfo)
})
