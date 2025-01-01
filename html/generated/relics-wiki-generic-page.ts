import { navbar } from "./navbar"
import type { PageElement } from "../../lib/page-element"

interface pageParams {
    title: string,
    backgroundImage: string,
    currentPath: string,
    content: PageElement[],
    additionalCss?: string
}

export const RelicsWikiPage = (pageParams: pageParams) =>
    `<!DOCTYPE html>
<html lang="en">

<head>
    <title>${pageParams.title}</title>
    <link rel="stylesheet" href="style.css" type="text/css" />
    <style>
        body {
            background: url(${pageParams.backgroundImage}) no-repeat center center fixed;
            background-size: cover;
        }
        ${pageParams.additionalCss ? pageParams.additionalCss : ""}
    </style>
</head>

<body>
    ${navbar(pageParams.currentPath)}
    <div id="container-main">
        <div id="container-content">
            ${pageParams.content.map(element => element.render()).join("\n")}
        </div>
    </div>
</body>
</html>
`
