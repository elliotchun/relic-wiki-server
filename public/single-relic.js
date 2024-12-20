const urlSearchParams = new URLSearchParams(window.location.search)
const relicName = urlSearchParams.get("relicName")

const headerTitle = document.getElementById("header-title")
headerTitle.innerText = relicName

const containerRelicRewards = document.getElementById("container-relic-rewards")
const containerRelicDropLocations = document.getElementById("container-relic-drop-locations")

const response = await fetch(`api/relics/${relicName}`)
const relic = await response.json()

relic.rewards.forEach(reward => {
    const containerRewardInformation = document.createElement("div")
    containerRewardInformation.innerText = reward.name
    containerRelicRewards.append(containerRewardInformation)
})

if (relic.dropLocations) {
    const relicSources = relic.dropLocations.map(location => location.location).join(", ")
    containerRelicDropLocations.innerText += `\nDrops from ${relicSources}`
}
