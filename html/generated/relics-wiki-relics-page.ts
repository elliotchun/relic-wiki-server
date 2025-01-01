import { navbar } from "./navbar"

interface pageParams {
    title: string,
    backgroundImage: string,
    currentPath: string
}

export const RelicsWikiRelicsPage = (pageParams: pageParams) =>
    `<!DOCTYPE html>
<html lang="en">

<head>
    <title>${pageParams.title}</title>
    <link rel='stylesheet' href='style.css' />
    <style>
        body {
            background: url(${pageParams.backgroundImage}) no-repeat center center fixed;
            background-size: cover;
        }
    </style>
</head>

<body>
    ${navbar(pageParams.currentPath)}
    <div id="container-main">
        <div id="container-content">
            <h1>RELICS</h1>
            <div id="search-bar">
                <input type="text" id="input-search" name="title" placeholder="Search for relics..."
                    autocomplete="off" />
                <div id="search-results">
                    <div id="container-relics"></div>
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="relics.js"></script>
</body>
</html>`
