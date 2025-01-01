type AttributeListType = Map<string, string[]>

export interface PageElement {
    tag: string
    render(): string
}

interface PageElementParameters {
    tag: string
}

const makeAttributeString = (attributeAndValuesList: [string, string[]]) => {
    const [attribute, valuesList] = attributeAndValuesList
    if (valuesList.length > 0)
        return `${attribute}="${valuesList.join(' ')}"`
    return attribute
}

const attributeListToString = (attributeList: AttributeListType) => attributeList.size > 0
    ? " " + Array.from(attributeList, makeAttributeString).join(" ")
    : ""

const addPageElementAttribute = (attributeList: AttributeListType, attribute: string, ...values: string[]) => {
    if (attributeList.has(attribute))
        attributeList.get(attribute)!.push(...values)
    else
        attributeList.set(attribute, [...values])
}

const renderPageElement = (tag: string, attributeList: AttributeListType, innerContent: string) =>
    `<${tag}${attributeListToString(attributeList)}>${innerContent}</${tag}>`

export class PageElementWithTextContent implements PageElement {
    tag: string
    innerText: string
    attributeList: AttributeListType

    constructor(params: PageElementParameters, content = "") {
        this.tag = params.tag
        this.innerText = content
        this.attributeList = new Map()
    }

    addAttribute(attribute: string, ...value: string[]) {
        addPageElementAttribute(this.attributeList, attribute, ...value)
        return this
    }

    render() {
        return renderPageElement(this.tag, this.attributeList, this.innerText)
    }
}

export class PageElementWithHTMLContent implements PageElement {
    tag: string
    innerHTML: PageElement[]
    attributeList: AttributeListType

    constructor(params: PageElementParameters, ...content: PageElement[]) {
        this.tag = params.tag
        this.innerHTML = content
        this.attributeList = new Map()
    }

    addAttribute(attribute: string, ...value: string[]) {
        addPageElementAttribute(this.attributeList, attribute, ...value)
        return this
    }

    render() {
        return renderPageElement(this.tag, this.attributeList,
            this.innerHTML
                .map(element => element.render())
                .join("\n"))
    }
}
