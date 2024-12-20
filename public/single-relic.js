const urlSearchParams = new URLSearchParams(window.location.search)
const relicName = urlSearchParams.get("relicName")

document.getElementById("header-title").innerText = relicName
