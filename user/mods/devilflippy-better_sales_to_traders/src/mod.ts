import path from "node:path"
import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ConfigServer } from "@spt/servers/ConfigServer"
import { ConfigTypes } from "@spt/models/enums/ConfigTypes"
import { ITraderConfig } from "@spt/models/spt/config/ITraderConfig"
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables"
import { LogTextColor } from "@spt/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt/models/spt/logging/LogBackgroundColor";

import { VFS } from "@spt/utils/VFS"

import { jsonc } from "jsonc"
const debug = false // [Debug] Debug!
class Mod implements IPostDBLoadMod
{
    public preSptLoad(container: DependencyContainer): void 
    {
        // Database will be empty in here
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const logger = container.resolve<ILogger>("WinstonLogger");
        logger.logWithColor(`Database item table state: ${databaseServer.getTables().templates} (<<< should be undefined)`, LogTextColor.RED, LogBackgroundColor.YELLOW);

    }

    public postDBLoad(container: DependencyContainer): void 
    {
        const vfs = container.resolve<VFS>("VFS")
        const config = jsonc.parse(vfs.readFile(path.resolve(__dirname, "../config/config.jsonc")))
        const logger = container.resolve<ILogger>("WinstonLogger")
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer")
        const configServer = container.resolve<ConfigServer>("ConfigServer")
        const tables: IDatabaseTables = databaseServer.getTables()
        const locales = tables.locales.global
        const items = tables.templates.items
        const handbook = tables.templates.handbook
        const globals = tables.globals.config
        const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER)
        const prapor = tables.traders["54cb50c76803fa8b248b4571"]
        const therapist = tables.traders["54cb57776803fa99248b456e"]
        const ragman = tables.traders["5ac3b934156ae10c4430e83c"]
        const jaeger = tables.traders["5c0647fdd443bc2504c2d371"]
        const mechanic = tables.traders["5a7c2eca46aef81a7ca2145d"]
        const peacekeeper = tables.traders["5935c25fb3acc3127c3d8cd9"]
        const skier = tables.traders["58330581ace78e27b8b10cee"]
        const traderlist = [prapor, therapist, ragman, jaeger, mechanic, peacekeeper, skier]


        if (config.TraderChanges.enabled) 
        {
            if (config.TraderChanges.Better_Sales_To_Traders.enabled) 
            {
                if (debug) 
                {
                    for (const trader in traderlist) 
                    {
                        log(`${traderlist[trader].base.nickname}.base.items_buy = {`)
                        log("\"category\": [")
                        traderlist[trader].base.items_buy.category.forEach((x) => log(`"${x}", // ${getItemName(x)}`))
                        log("],")
                        log("\"id_list\": [")
                        traderlist[trader].base.items_buy.id_list.forEach((x) => log(`"${x}", // ${getItemName(x)}`))
                        log("]}")
                    }
                }
                if (debug) 
                {
                    for (const trader in traderlist) 
                    {
                        log(`${traderlist[trader].base.nickname}.base.sell_category = [`)
                        traderlist[trader].base.sell_category.forEach((x) => log(`"${x}", // ${locales["en"][x]}`))
                        // traderlist[trader].base.sell_category.forEach((x) => log(locales["en"][`${x}`]))
                        log("]")
                    }
                    //
                    for (const trader in traderlist) 
                    {
                        log(`${traderlist[trader].base.nickname}: ${100 - traderlist[trader].base.loyaltyLevels[3].buy_price_coef}%`)
                    }
                }

                try 
                {
                    for (const trader in traderlist) 
                    {
                        traderlist[trader].base.loyaltyLevels[0].buy_price_coef = 35
                        traderlist[trader].base.loyaltyLevels[1].buy_price_coef = 30
                        traderlist[trader].base.loyaltyLevels[2].buy_price_coef = 25
                        traderlist[trader].base.loyaltyLevels[3].buy_price_coef = 20
                    }

                    peacekeeper.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                    skier.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                    prapor.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                    mechanic.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                    jaeger.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                    ragman.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                    therapist.base.loyaltyLevels.forEach((x) => (x.buy_price_coef += 5))
                }
                catch (error) 
                {
                    logger.warning("\nTraderChanges.BetterSalesToTraders failed. Send bug report. Continue safely.")
                    log(error)
                }
            }

            if (config.TraderChanges.Reasonably_Priced_Cases.enabled == true) 
            {
                try 
                {
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d2497"][0].forEach((x) => (x.count = 5)) // T H I C C item case (LEDX) 5c0a840b86f7742ffa4f2482
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d24d3"][0].forEach((x) => (x.count = 10)) // T H I C C item case (Moonshine)5c0a840b86f7742ffa4f2482
                    therapist.assort.barter_scheme["666aa326e8e00edadd0d2473"][0].forEach((x) => (x.count = 7256)) // Item case (Euro) 13839 59fb042886f7746c5005a7b2
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d249d"][0].forEach((x) => (x.count = 8)) // Item case (OScope) 59fb042886f7746c5005a7b2
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d24b2"][0].forEach((x) => (x.count = 25)) // Item case (Dogtags) 59fb042886f7746c5005a7b2
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d24af"][0].forEach((x) => (x.count = 20)) // Lucky Scav Junk box (Dogtags) 5b7c710788a4506dec015957
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d2494"][0].forEach((x) => (x.count = 961138)) // Lucky Scav Junk box (Rubles) 1106138 5b7c710788a4506dec015957
                    therapist.assort.barter_scheme["666aa327e8e00edadd0d249a"][0].forEach((x) => (x.count = 290610)) // Medcase (Rubles) 5aafbcd986f7745e590fff23
                    therapist.assort.barter_scheme["666aa328e8e00edadd0d2518"][0].forEach((x) => (x.count /= 25)) // LEDX (Dogtags) // Really BSG? 160 kills for a non-FIR item? REALLY?! 5c0530ee86f774697952d952

                    peacekeeper.assort.barter_scheme["6492e44bf4287b13040fca51"][0].forEach((x) => (x.count = Math.round(x.count / 5 + 1))) // THICC case (SMT+Bluefolder+SecureFlashDrive) 5c0a840b86f7742ffa4f2482

                    skier.assort.barter_scheme["666aa2e0e8e00edadd0d03f6"][0].forEach((x) => (x.count = 4)) // Weapon case (Moonshine) 59fb023c86f7746d0d4b423c
                }
                catch (error) 
                {
                    logger.warning("\nTraderChanges.Reasonably_Priced_Cases failed. Send bug report. Continue safely.")
                    log(error)
                }
            }

            if (config.TraderChanges.Bigger_Limits.enabled == true) 
            {
                try 
                {
                // mark

                    for (const trader in traderlist) 
                    {
                        for (const item in traderlist[trader].assort.items) 
                        {
                        // log(traderlist[trader].assort.items[item])
                            if (traderlist[trader].assort.items[item]?.upd?.BuyRestrictionMax) 
                            {
                                traderlist[trader].assort.items[item].upd.BuyRestrictionMax *= config.TraderChanges.Bigger_Limits.Limit_Multiplier
                            }
                        }
                    }
                }
                catch (error) 
                {
                    logger.warning("\nTraderChanges.Bigger_Limits failed. Send bug report. Continue safely.")
                    log(error)
                }
            }
            if (config.EconomyOptions.Disable_Flea_Market_Completely.disable) 
            {
                try 
                {
                    globals.RagFair.minUserLevel = 99
                }
                catch (error) 
                {
                    logger.warning("\nEconomyOptions.Disable_Flea_Market_Completely failed. Send bug report. Continue safely.")
                    log(error)
                }
            }
            else 
            {
                try 
                {
                    globals.RagFair.minUserLevel = config.EconomyOptions.Fleamarket_Opened_at_Level.value
                }
                catch (error) 
                {
                    logger.warning("\nEconomyOptions.Fleamarket_Opened_at_Level failed. Send bug report. Continue safely.")
                    log(error)
                }
                
            }
            
        }
        function getItemName(itemID, locale = "en") 
        {
            if (locales[locale][`${itemID} Name`] != undefined) 
            {
                // return items[itemID]._name
                return locales[locale][`${itemID} Name`]
            }
            else 
            {
                return items[itemID]?._name
            }
        }
    }
}
const log = (i: any) => 
{
    console.log(i)
}


export const mod = new Mod()
