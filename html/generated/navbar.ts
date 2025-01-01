import { PageElementWithHTMLContent, PageElementWithTextContent } from "../../lib/page-element"

export const navbar = (currentPath: string) => {
    const createNavElement = (dest: string, text: string) => {
        const link = new PageElementWithTextContent({ tag: "a" }, text)
        link.addAttribute("href", dest)

        const btn = new PageElementWithHTMLContent({ tag: "div" }, link)
        btn.addAttribute("class", "nav-item")
        if (dest === currentPath)
            btn.addAttribute("class", "active")
        return btn.render()
    }

    return `<div id="header-navbar">
    <style>
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
        </style>
    ${createNavElement("/", "HOME")}
    ${createNavElement("/relics", "RELICS")}
    ${createNavElement("/primes", "PRIMES")}
</div>`
}
