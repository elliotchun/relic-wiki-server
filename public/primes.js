const response = await fetch("api/primes")
const primes = await response.json()
console.log(primes)
