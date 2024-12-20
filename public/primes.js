const response = await fetch("api/primes")
const primes = await response.json()
const primesContainerElement = document.getElementById("container-primes")

Object.keys(primes)
    .sort((a, b) => a.localeCompare(b))
    .forEach((key) => {
        const relicSources = primes[key].join(", ")
        const primeInfo = document.createElement("div")
        primeInfo.innerText = `${key}\nDrops from ${relicSources}`
        primeInfo.classList.add("container-prime")
        primesContainerElement.appendChild(primeInfo)
    })
