import { warframeItemsRelics } from "../data/warframe-items-relic-data-source"
import type { ItemApiResponse } from "../models/relic"

const parsedItems: ItemApiResponse = warframeItemsRelics
await Bun.write("data/relics.json", JSON.stringify(parsedItems))
