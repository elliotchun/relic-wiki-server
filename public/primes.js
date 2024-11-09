const response = await fetch("api/primes")
const primes = await response.json()
const primesContainerElement = document.getElementById("container-primes")

Object.keys(primes).forEach((key) => {
    const relicSource = primesContainerElement[key]
    const primeInfo = document.createElement("div")
    primeInfo.innerText = `${key}`
    primeInfo.classList.add("container-prime")
    primesContainerElement.appendChild(primeInfo)
})