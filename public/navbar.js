class Navbar extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const style = document.createElement("style")
        style.textContent = `
            .nav-item a {
                text-decoration: none;
                padding: 1rem;
                color: black;
            }

            .nav-item {
                display: inline-flex;
                width: fit-content;
            }
            .nav-item.active {
                background-color: skyblue;
            }
            .nav-item a:hover {
                color: teal;
            }
        `
        this.appendChild(style)
        this.appendChild(createNavElement("/", "HOME"))
        this.appendChild(createNavElement("/relics", "RELICS"))
        this.appendChild(createNavElement("/primes", "PRIMES"))

        for (const e of document.getElementsByClassName("nav-item")) {
            if (e.firstChild.href === window.location.href)
                e.classList.add("active")
        }
    }
}

const createNavElement = (dest, text) => {
    const link = document.createElement("a")
    link.setAttribute("href", dest)
    link.innerText = text

    const btn = document.createElement("div")
    btn.classList.add("nav-item")
    btn.appendChild(link)

    return btn
}

customElements.define('header-navbar', Navbar)
